import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { addContent, getContent } from "../../api";

/** Components */
import Button from "../../components/Button";
import Form from "../../components/Form";
import Container from "../../components/Layouts/Container";
import PageTitle from "../../components/PageTitle";
import ContentCard from "../../components/ContentCard";

/** Icons */
import { MdLibraryAdd } from "react-icons/md";

/** Styles */
import styles from "./style.module.css";


const Content = () => {
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
      placeholder: "Type your link youtube here...",
      value: "",
      content: true,
    },
  ]);

  const [lists, setLists] = useState([]);

  const handleClick = () => {
    let message = "";
    const title = inputs[0].value;
    const link = inputs[1].value;

    if (title === "" || link === "") {
      message = "Please fill out title and youtube link";
    }

    if (title === "") {
      message = "Title cannot be empty";
    }
    else if (link === "") {
      message = "Link cannot be empty";
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
        addContent({
          title: title,
          videoUrl: link,
        }).then(async () =>
          getContent().then((response) => setLists(response.data))
        );
        Swal.fire({
          title: "Success!",
          text: "Content has been posted sucessfully!",
          icon: "success",
        });

        setInputs([
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
            placeholder: "Type your link youtube here..",
            value: "",
            content: true,
          },
        ]);
      });
    }
  };

  useEffect(() => {
    getContent().then((response) => setLists(response.data));
  }, []);

  return (
    <>
      <PageTitle icon={<MdLibraryAdd />} title="Content" />
      <div className={styles.container}>
        <div className={styles.head}>
          <h5>Add New Content</h5>
          <Button text="Send" type="submit" onClick={() => handleClick()} />
        </div>
        <div className={styles.wrapper}>
          <Form inputs={inputs} setInputs={setInputs} />
        </div>
      </div>
      <Container>
        <ContentCard lists={lists} />
      </Container>
    </>
  );
};

export default Content;
