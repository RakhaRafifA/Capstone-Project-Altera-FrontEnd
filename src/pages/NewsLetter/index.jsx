import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { addNewsLetter, getNewsLetter } from "../../api";

/** Component */
import Button from "../../components/Button";
import Form from "../../components/Form";
import Container from "../../components/Layouts/Container";
import PageTitle from "../../components/PageTitle";
import NewsLetterCard from "../../components/NewsletterCard";

/** Styles */
import styles from "./style.module.css";

/** Icons */
import { TiNews } from "react-icons/ti";

const Newsletter = () => {
  const [inputs, setInputs] = useState([
    {
      label: "",
      name: "title",
      type: "text",
      placeholder: "Type your title here...",
      value: "",
    },
    {
      label: "",
      name: "content",
      type: "textarea",
      placeholder: "Type your text here...",
      value: "",
    },
  ]);

  const [lists, setLists] = useState([]);

  const handleClick = () => {
    let message = "";

    const title = inputs[0].value;
    const content = inputs[1].value;

    if (title === "" || content === "") {
      message = "Please fill out title and content";
    }
    if (title === "") {
      message = "Title cannot be empty";
    }
    else if (content === "") {
      message = "Content cannot be empty";
    }
    if (message !== "") {
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
    else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0583d2",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, post it!",
      }).then((result) => {
        if (result.isConfirmed) {
          addNewsLetter({
            title: title,
            description: inputs[1].value,
          }).then(async () =>
            getNewsLetter().then((response) => setLists(response.data))
          );
          Swal.fire({
            title: "Success!",
            text: "Newsletter has been posted sucessfully!",
            icon: "success",
          });

          setInputs([
            {
              label: "",
              name: "title",
              type: "text",
              placeholder: "Type your Title",
              value: "",
            },
            {
              label: "",
              name: "content",
              type: "textarea",
              placeholder: "Type your text here",
              value: "",
            },
          ]);
        }
      });
    }
  };
  useEffect(() => {
    getNewsLetter().then((response) => setLists(response.data));
  }, []);

  return (
    <>
      <PageTitle icon={<TiNews />} title="Newsletter" />
      <div className={styles.container}>
        <div className={styles.head}>
          <h5>Add New Newsletter</h5>
          <Button text="Send" type="submit" onClick={() => handleClick()} />
        </div>
        <div className={styles.wrapper}>
          <Form inputs={inputs} setInputs={setInputs} />
        </div>
      </div>
      <Container>
        <NewsLetterCard lists={lists} />
      </Container>
    </>
  );
};

export default Newsletter;
