import { useState } from "react";

/** Icons */
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

/** Styles */
import styles from "./style.module.css";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^[0-9]{10,13}$/;

const Form = ({ inputs, setInputs, type }) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e, index, inputs, inputLabel) => {
    const value = e.target.value;
    const temp = [...inputs];

    temp[index].value = value;

    if (inputLabel === "Password") {
      if (passwordRegex.test(value) === false) {
        temp[index].error = "Your password needs to include upper case, include at least one number, be at least 8 characters long";
        setInputs([...inputs], temp);
      }
      else {
        temp[index].error = "";
        setInputs([...inputs], temp);
      }
    }
    else if (inputLabel === "Email") {
      if (emailRegex.test(value) === false) {
        temp[index].error = "Email Invalid";
        setInputs([...inputs], temp);
      }
      else {
        temp[index].error = "";
        setInputs([...inputs], temp);
      }
    }
    else if (inputLabel === "Contact") {
      if (phoneRegex.test(value) === false) {
        temp[index].error = "Phone number invalid";
        setInputs([...inputs], temp);
      }
      else {
        temp[index].error = "";
        setInputs([...inputs], temp);
      }
    }
    else {
      setInputs([...inputs], temp);
    }
  };

  return (
    <div className={styles.container}>
      {
        inputs.map((input, inputIdx) => (
          <div className={styles.form_item} key={inputIdx}>
            {input.label !== "" && <label>{input.label}</label>}

            <div className={styles.input_wrapper}>
              {input.type === "textarea" ? (
                <textarea
                  value={input.value}
                  name={input.name}
                  placeholder={input.placeholder}
                  rows={input.content ? "2" : "8"}
                  className={styles.textarea}
                  disabled={input.disabled}
                  onChange={(e) => handleChange(e, inputIdx, inputs, input.label)}
                ></textarea>
              ) : (
                <input
                  type={
                    input.type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : input.type
                  }
                  name={input.name}
                  value={input.value}
                  placeholder={input.placeholder}
                  min={input.min}
                  disabled={input.disabled}
                  onChange={(e) => handleChange(e, inputIdx, inputs, input.label)}
                  required
                />
              )}
              {input.type === "password" ? (
                showPassword ? (
                  <AiOutlineEye
                    className={styles.eye}
                    onClick={handleShowPassword}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className={styles.eye}
                    onClick={handleShowPassword}
                  />
                )
              ) : (
                <></>
              )}
            </div>
            {
              input.error !== "" && type !== "login" && (
                <p className={styles.error}>{input.error}</p>
              )
            }
          </div>
        ))
      }
    </div>
  );
};

export default Form;
