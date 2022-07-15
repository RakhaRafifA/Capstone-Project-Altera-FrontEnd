import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

import { getLoginToken } from "../../api";

/** Styles */
import styles from "./style.module.css";

/** Components */
import Form from "../../components/Form";
import TitleLogo from "../../components/TitleLogo";

const Login = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const [inputs, setInputs] = useState([
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Type your username...",
      value: "",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Type your password...",
      value: "",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    getLoginToken({
      username: inputs[0].value,
      password: inputs[1].value,
    })
      .then((result) => {
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: result.data.access_token,
            user: jwtDecode(result.data.access_token),
          })
        );
        navigate("/dashboard");

        Swal.fire({
          title: "Login Success!",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Error!",
          text: "An error occurred when login",
          icon: "error",
        });
      });

    setInputs([...inputs], (inputs[0].value = ""), (inputs[1].value = ""));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <TitleLogo />
        <Form inputs={inputs} setInputs={setInputs} type="login" />
        <button type="submit" className={styles.login_btn}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
