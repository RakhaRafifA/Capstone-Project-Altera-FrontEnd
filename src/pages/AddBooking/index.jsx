import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { addBooking, getClass, getUserData } from "../../api";

/** Components */
import Container from "../../components/Layouts/Container";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";

/** Icons */
import { MdEventAvailable } from "react-icons/md";

/** Style */
import styles from "./style.module.css";

const AddBooking = () => {

  const navigate = useNavigate();

  const [classSelectedOption, setClassSelectedOption] = useState(null);
  const [classOptions, setClassOptions] = useState(null);

  const [userSelectedOption, setUserSelectedOption] = useState(null);
  const [userOptions, setUserOptions] = useState(null);

  const [statusSelectedOption, setStatusSelectedOption] = useState(null);
  const statusOptions = [
    { value: 1, label: "Active" },
    { value: 0, label: "Non-Active" },
  ];

  useEffect(() => {
    getClass().then(response => {
      let temp = [];
      response.data.map((data) => {
        return temp.push({ value: data.classId, label: `${data.typeName} ${data.roomName} - ${data.categoryName}` });
      });
      setClassOptions(temp);
    });
    getUserData().then(response => {
      let temp = [];
      response.data.map((data) => {
        return temp.push({ value: data.userId, label: `${data.userId} - ${data.name}` });
      });
      setUserOptions(temp);
    });
  }, [])

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
        addBooking({
          status: statusSelectedOption.value,
          userId: userSelectedOption.value,
          classId: classSelectedOption.value
        }).then(res => {
          navigate("/booking");

          Swal.fire({
            title: "Success!",
            text: "Booking has been added sucessfully!",
            icon: "success",
          });
        });
      }
    })
  };

  return (
    <>
      <PageTitle icon={<MdEventAvailable />} title="Booking" />
      <Container title="Add New Booking">
        <div className="container no-pl mt-4">
          <form onSubmit={handleSave}>
            <div className="row">
              <div className="col">
                <label className="label">Class</label>
                <Select
                  className={styles.select_input}
                  defaultValue={classSelectedOption}
                  onChange={setClassSelectedOption}
                  options={classOptions}
                  placeholder="Class"
                />
                <label className="label">Status</label>
                <Select
                  className={styles.select_input}
                  defaultValue={statusSelectedOption}
                  onChange={setStatusSelectedOption}
                  options={statusOptions}
                  placeholder="Status"
                />
              </div>
              <div className="col">
                <label className="label">User</label>
                <Select
                  className={styles.select_input}
                  defaultValue={userSelectedOption}
                  onChange={setUserSelectedOption}
                  options={userOptions}
                  placeholder="User"
                />
              </div>
            </div>

            <span className={styles.button}>
              <Button
                text="Save"
                type="submit"
                onClick={(e) => {
                  handleSave(e);
                }}
              />
            </span>
          </form>
        </div>
      </Container>
    </>
  );
};

export default AddBooking;
