import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import {
  editClass,
  getCategory,
  getClassById,
  getInstructor,
  getRoom,
  getType,
  getUserByClassId,
} from "../../api";

/** Styles */
import styles from "./style.module.css";

/** Components */
import Container from "../../components/Layouts/Container";
import PageTitle from "../../components/PageTitle";
import Details from "../../components/Details";
import Form from "../../components/Form";
import Button from "../../components/Button";
import Table from "../../components/Table";

/** Icon */
import { IoIosPeople } from "react-icons/io";

/** React js chart */
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const DetailsClass = () => {

  const navigate = useNavigate();

  const params = useParams();

  const tomorrow = new Date(new Date());
  tomorrow.setDate(tomorrow.getDate() + 1);
  const temp =
    tomorrow.getFullYear() +
    "-" +
    String(tomorrow.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(tomorrow.getDate()).padStart(2, "0");

  const [data, setData] = useState();

  const [roomSelectedOption, setRoomSelectedOption] = useState(null);
  const [roomOptions, setRoomOptions] = useState(null);

  const [instructureSelectedOption, setInstructureSelectedOption] = useState(null);
  const [instructureOptions, setInstructureOptions] = useState(null);

  const [typeSelectedOption, setTypeSelectedOption] = useState(null);
  const [typeOptions, setTypeOptions] = useState(null);

  const [categorySelectedOption, setCategorySelectedOption] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState(null);

  const [lists, setLists] = useState([]);
  const [statusSelectedOption, setStatusSelectedOption] = useState(null);

  const [capacityInput, setCapacityInput] = useState([
    {
      label: "Capacity",
      name: "capacity",
      type: "number",
      placeholder: "Type class capacity...",
      value: "",
    },
  ]);

  const [descriptionInput, setDescriptionInput] = useState([
    {
      label: "Description",
      name: "description",
      type: "textarea",
      placeholder: "Type class details...",
      value: "",
    },
  ]);

  const [scheduleInput, setScheduleInput] = useState([
    {
      label: "Schedule",
      name: "schedule",
      type: "date",
      placeholder: "dd/mm/yy",
      value: "",
      min: temp,
    },
  ]);

  const [priceInput, setPriceInput] = useState([
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "Type class price...",
      value: "",
    },
  ]);

  const [percentage, setPercentage] = useState(0);

  const [dataSet, setDataSet] = useState({
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#0583d2", "#E8F4FC"],
      },
    ],
    labels: ["Members", "Available"],
  });

  let priceIDR = Intl.NumberFormat("en-ID");

  const options = [
    { value: true, label: "Active" },
    { value: false, label: "Non-Active" },
  ];

  useEffect(() => {
    getRoom().then((response) => {
      let temp = [];
      response.data.map((data) => {
        return temp.push({ value: data.roomId, label: data.name });
      });
      setRoomOptions(temp);
    });
    getInstructor().then((response) => {
      let temp = [];

      response.data.map((data) => {
        return temp.push({ value: data.instructorId, label: data.name });
      });
      setInstructureOptions(temp);
    });
    getCategory().then((response) => {
      let temp = [];
      response.data.map((data) => {
        return temp.push({ value: data.categoryId, label: data.name });
      });
      setCategoryOptions(temp);
    });
    getType().then((response) => {
      let temp = [];
      response.data.map((data) => {
        return temp.push({ value: data.typeId, label: data.name });
      });

      setTypeOptions(temp);
    });
    getClassById(params.id).then((response) => {
      setData(response.data);
      setDataSet({
        datasets: [
          {
            data: [response.data.booked, response.data.capacity],
            backgroundColor: ["#0583d2", "#E8F4FC"],
          },
        ],
        labels: ["Members", "Available"],
      });
      if (response.data.booked > 0) {
        setPercentage(
          Math.round(response.data.capacity / response.data.booked)
        );
      }
      else {
        setPercentage(100);
      }

      getUserByClassId(params.id).then((response) => {
        setLists(response.data);
      });

      setCapacityInput([
        {
          label: "Capacity",
          name: "capacity",
          type: "number",
          placeholder: "Type class capacity...",
          value: response.data.capacity,
        },
      ]);
      setDescriptionInput([
        {
          label: "Description",
          name: "description",
          type: "textarea",
          placeholder: "Type class details...",
          value: response.data.description,
        },
      ]);

      let schedule = response.data.schedule;

      setScheduleInput([
        {
          label: "Schedule",
          name: "schedule",
          type: "date",
          placeholder: "dd/mm/yy",
          value: `${schedule.substring(6, 10)}-${schedule.substring(
            3,
            5
          )}-${schedule.substring(0, 2)}`,
          min: temp,
        },
      ]);
      setPriceInput([
        {
          label: "Price",
          name: "price",
          type: "number",
          placeholder: "Type class price...",
          value: response.data.price,
        },
      ]);

      setTypeSelectedOption({
        value: response.data.typeId,
        label: response.data.typeName,
      });
      setRoomSelectedOption({
        value: response.data.roomId,
        label: response.data.roomName,
      });
      setInstructureSelectedOption({
        value: response.data.instructureId,
        label: response.data.instructureName,
      });
      setCategorySelectedOption({
        value: response.data.categoryId,
        label: response.data.categoryName,
      });
      if (response.data.status) {
        setStatusSelectedOption({ value: true, label: "Active" });
      }
      else {
        setStatusSelectedOption({ value: false, label: "Non-Active" });
      }
    });
  }, [params.id]);

  const handleSave = (e) => {
    e.preventDefault();

    let temp = new Date(scheduleInput[0].value);

    let date = "";

    if (temp.getDate() < 10 && temp.getMonth() < 10) {
      date = `0${temp.getDate()}/0${temp.getMonth()}/${temp.getFullYear()}`;
    }
    else if (temp.getDate() >= 10 && temp.getMonth() < 10) {
      date = `${temp.getDate()}/0${temp.getMonth()}/${temp.getFullYear()}`;
    }
    else if (temp.getDate() < 10 && temp.getMonth() >= 10) {
      date = `0${temp.getDate()}/${temp.getMonth()}/${temp.getFullYear()}`;
    }
    else {
      date = `${temp.getDate()}/${temp.getMonth()}/${temp.getFullYear()}`;
    }

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
        editClass({
          id: params.id,
          status: statusSelectedOption.value,
          description: descriptionInput[0].value,
          capacity: parseInt(capacityInput[0].value),
          schedule: date,
          price: parseInt(priceInput[0].value),
          instructorId: instructureSelectedOption.value,
          categoryId: categorySelectedOption.value,
          roomId: roomSelectedOption.value,
          typeId: typeSelectedOption.value,
        }).then((result) => {
          navigate("/class");
          Swal.fire({
            title: "Success!",
            text: "Class has been modified successfully!",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div className={styles.content_wrapper}>
      <PageTitle icon={<IoIosPeople />} title="Class" />
      <Container title={"Details Class"}>
        <div className="container no-pl mt-2">
          <div className="row">
            <div className="col">
              <Details title={"ID Class"} text={data?.classId} />
              <Details title={"Type"} text={data?.typeName} />
              <Details title={"Room"} text={data?.roomName} />
              <Details title={"Instructure"} text={data?.instructureName} />
            </div>
            <div className="col">
              <Details title={"Contact Instructure"} text={data?.contact} />

              <Details
                title={"Status"}
                text={data?.status ? "Active" : "Non-Active"}
              />
              {data?.typeName ? (
                <Details title={"Category"} text={"Online"} />
              ) : (
                <Details title={"Category"} text={"Offline"} />
              )}
            </div>
            <div className="col">
              {!lists?.length > 0 ? (
                <Details title={"Total Members"} text={`0 person`} />
              ) : (
                <Details
                  title={"Total Members"}
                  text={`${lists.length} person`}
                />
              )}
              <Details
                title={"Price"}
                text={`Rp. ${priceIDR.format(data?.price)}`}
              />
              <Details title={"Held On"} text={data?.schedule} />
            </div>
          </div>
        </div>
      </Container>
      <Container title={"Edit Class"}>
        <div className="container no-pl mt-4">
          <form onSubmit={handleSave}>
            <div className="row">
              <div className="col">
                <label className="label mt-3">Room</label>
                <Select
                  className={`mt-3 ${styles.select_input}`}
                  defaultValue={roomSelectedOption}
                  onChange={setRoomSelectedOption}
                  options={roomOptions}
                  placeholder={data?.roomName}
                />

                <label className="label mt-3">Instructure</label>
                <Select
                  className={`mt-3 ${styles.select_input}`}
                  defaultValue={instructureSelectedOption}
                  onChange={setInstructureSelectedOption}
                  options={instructureOptions}
                  placeholder={data?.instructureName}
                />

                <label className="label mt-3">Type</label>
                <Select
                  className={`mt-3 ${styles.select_input}`}
                  defaultValue={typeSelectedOption}
                  onChange={setTypeSelectedOption}
                  options={typeOptions}
                  placeholder={data?.typeName}
                />
                <span className={styles.input}>
                  <Form
                    inputs={descriptionInput}
                    setInputs={setDescriptionInput}
                  />
                </span>
              </div>
              <div className="col">
                <label className="label mt-3">Category</label>
                <Select
                  className={`mt-3 ${styles.select_input}`}
                  defaultValue={categorySelectedOption}
                  onChange={setCategorySelectedOption}
                  options={categoryOptions}
                  placeholder={data?.categoryName}
                />

                <label className="label mt-3">Status</label>
                <Select
                  className={`mt-3 ${styles.select_input}`}
                  defaultValue={statusSelectedOption}
                  onChange={setStatusSelectedOption}
                  options={options}
                  placeholder={data?.status ? "Active" : "Not-Active"}
                />
                <span className={styles.input}>
                  <Form inputs={capacityInput} setInputs={setCapacityInput} />
                </span>
                <Form inputs={scheduleInput} setInputs={setScheduleInput} />
                <Form inputs={priceInput} setInputs={setPriceInput} />
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

      <PageTitle icon={<IoIosPeople />} title="Class Members" />
      <div className={styles.wrapper}>
        <span className={styles.left}>
          <Container>
            <Table
              headers={["ID", "Name", "Status", "Joined At"]}
              datas={lists}
              name="class-table"
            />
          </Container>
        </span>
        <section className={styles.doughnut}>
          <h5>Current Students</h5>
          <Doughnut data={dataSet} />
          <div className={styles.donut_inner}>
            <h3>{percentage} %</h3>
            <h5>Available</h5>
          </div>
          <div className={styles.info}>
            <b>Capactiy : </b> {data?.capacity} people
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailsClass;
