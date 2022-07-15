import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addUserData } from "../../api";

/** Styles */
import styles from "./style.module.css";

/** Icon */
import { FaUserCircle } from "react-icons/fa";

/** Components */
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Container from "../../components/Layouts/Container";
import Form from "../../components/Form";

const AddUser = () => {

  const navigate = useNavigate();

  const [firstInput, setFirstInput] = useState([
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Type user name...",
      value: "",
      error: "",
    },
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Type user username...",
      value: "",
      error: "",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Type user email...",
      value: "",
      error: "",
    },
  ]);

  const [secondInput, setSecondInput] = useState([
    {
      label: "Contact",
      name: "contact",
      type: "text",
      placeholder: "Type user contact...",
      value: "",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      placeholder: "Type user address...",
      value: "",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Type user password...",
      value: "",
    },
  ]);

  const handleSave = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0583d2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        addUserData({
          name: firstInput[0].value,
          username: firstInput[1].value,
          email: firstInput[2].value,
          phone: secondInput[0].value,
          address: secondInput[1].value,
          password: secondInput[2].value,
        }).then((result) => {
          navigate("/user");
          Swal.fire({
            title: "Success!",
            text: "User has been added sucessfully!",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <>
      <PageTitle icon={<FaUserCircle />} title="User" />
      <Container title="Add New Account">
        <form onSubmit={handleSave}>
          <div className="row">
            <div className="col">
              <Form inputs={firstInput} setInputs={setFirstInput} />
            </div>
            <div className="col">
              <Form inputs={secondInput} setInputs={setSecondInput} />
              <span className={styles.button}>
                <Button
                  text="Save"
                  type="submit"
                  onClick={(e) => {
                    handleSave(e);
                  }}
                />
              </span>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
};

export default AddUser;
