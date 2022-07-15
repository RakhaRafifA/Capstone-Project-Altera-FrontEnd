import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import { getUserData, getClass, getBookingById, editBooking } from "../../api";

/** Components */
import Container from "../../components/Layouts/Container";
import PageTitle from "../../components/PageTitle";
import Details from "../../components/Details";
import Button from "../../components/Button";

/** Icon */
import { MdEventAvailable } from "react-icons/md";

/** Styles */
import styles from "./style.module.css";

const DetailsBooking = () => {

  const params = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const [userSelectedOption, setUserSelectedOption] = useState(null);
  const [userOptions, setUserOptions] = useState(null);

  const [classSelectedOption, setClassSelectedOption] = useState(null);
  const [classOptions, setClassOptions] = useState(null);

  const [statusSelectedOption, setStatusSelectedOption] = useState(null);
  const statusOptions = [
    { value: 1, label: "Active" },
    { value: 0, label: "Non-Active" },
  ];

  useEffect(() => {
    setUserSelectedOption({
      value: data?.userId,
      label: `${data?.userId} - ${data?.userName}`,
    });

    setClassSelectedOption({
      value: data?.classId,
      label: `${data?.type} ${data?.room} - ${data?.categoryName}`
    })

    setStatusSelectedOption({
      value: data?.status,
      label: data?.status ? "Active" : "Non-Active"
    })
  }, [data]);

  useEffect(() => {
    getBookingById(params.id)
      .then(response => {
        setData(response.data);
      });

    getUserData()
      .then(response => {
        let temp = [];
        response.data.map((data) => {
          return temp.push({
            value: data.userId,
            label: `${data.userId} - ${data.name}`,
          });
        });

        setUserOptions(temp);
      })

    getClass()
      .then(response => {
        let temp = [];
        response.data.map((data) => {
          return temp.push({
            value: data.classId,
            label: `${data.typeName} ${data.roomName} - ${data.categoryName}`
          });
        });

        setClassOptions(temp);
      })
  }, [params.id])

  let priceIDR = Intl.NumberFormat("en-ID");

  const handleSave = (e, id) => {
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
        editBooking({
          id,
          status: statusSelectedOption.value,
          userId: userSelectedOption.value,
          classId: classSelectedOption.value
        }).then(res => {
          navigate("/booking");

          Swal.fire({
            title: "Success!",
            text: "Booking has been updated successfully!",
            icon: "success",
          });
        });
      }
    })
  };

  return (
    <>
      <PageTitle icon={<MdEventAvailable />} title="Booking" />
      <Container title={"Details Booking"}>
        <div className="container no-pl mt-2">
          <div className="row">
            <div className="col">
              <Details title={"Booking ID"} text={data?.bookingId} />
              <Details title={"Booking Class"} text={`${data?.type} ${data?.room} - ${data?.categoryName}`} />
            </div>
            <div className="col">
              <Details
                title={"User"}
                text={`${data?.userId} - ${data?.userName}`}
              />
              <Details title={"Instructure"} text={data?.instructureName} />
            </div>
            <div className="col">
              <Details title={"Schedule"} text={data?.schedule} />
              <Details
                title={"Price"}
                text={`Rp. ${priceIDR.format(data?.price)}`}
              />
            </div>
          </div>
        </div>
      </Container>
      <Container title="Edit Booking">
        <form onSubmit={handleSave}>
          <div className="row">
            <div className="col">
              <label className="label mt-3">Class</label>
              <Select
                className={`mt-3 ${styles.select_input}`}
                defaultValue={classSelectedOption}
                onChange={setClassSelectedOption}
                options={classOptions}
                placeholder={`${data?.type} ${data?.room} - ${data?.categoryName}`}
              />
              <label className="label mt-3">Status</label>
              <Select
                className={`mt-3 ${styles.select_input}`}
                defaultValue={statusSelectedOption}
                onChange={setStatusSelectedOption}
                options={statusOptions}
                placeholder={data?.status ? "Active" : "Non-Active"}
              />
            </div>
            <div className="col">
              <label className="label mt-3">User</label>
              <Select
                className={`mt-3 ${styles.select_input}`}
                defaultValue={userSelectedOption}
                onChange={setUserSelectedOption}
                options={userOptions}
                placeholder={`${data?.userId} - ${data?.userName}`}
              />
            </div>
          </div>

          <span className={styles.button}>
            <Button
              text="Save"
              type="submit"
              onClick={(e) => {
                handleSave(e, data?.bookingId);
              }}
            />
          </span>
        </form>
      </Container>
    </>
  );
};

export default DetailsBooking;
