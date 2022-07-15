import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { deleteBooking, getBooking, getBookingById } from "../../api";

/** Styles */
import styles from "./style.module.css";

/** Icon */
import { MdEventAvailable } from "react-icons/md";

/** Components */
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Table from "../../components/Table";

const Booking = () => {
  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState([]);
  const [bookingSelectedOption, setBookingSelectedOption] = useState([]);
  const [bookingOptions, setBookingOptions] = useState();

  useEffect(() => {
    getBooking().then(response => {
      setDatas(response.data);
      setShow(response.data);
    });
  }, []);

  useEffect(() => {
    setBookingOptions([{ value: 0, label: "All" }]);

    datas?.map((data) => {
      let temp = {
        value: data.bookingId,
        label: `${data.bookingId} - ${data.userName}`,
      };
      return setBookingOptions((oldData) => [...oldData, temp]);
    });
  }, [datas]);

  useEffect(() => {
    if (
      bookingSelectedOption.value === 0 ||
      bookingSelectedOption.value === undefined
    ) {
      getBooking().then((response) => {
        setShow(response.data);
      });
    } else {
      getBookingById(bookingSelectedOption.value).then((response) => {
        console.log(response)
        setShow([response.data]);
      });
    }
  }, [bookingSelectedOption]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0583d2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBooking(id).then(async () => {
          getBooking().then((response) => {
            setDatas(response.data);
            setShow(response.data);
          });
        });
        Swal.fire("Deleted!", "Booking has been deleted.", "success");
      }
    });
  };

  const handleDetail = (id) => {
    navigate(`details-booking/${id}`);
  };

  return (
    <div className={styles.content_wrapper}>
      <main>
        <PageTitle icon={<MdEventAvailable />} title="Booking" />
        <section className={styles.top_section}>
          <div className={styles.filter_wrapper_top}>
            <Select
              className={styles.select_input}
              defaultValue={bookingSelectedOption}
              onChange={setBookingSelectedOption}
              options={bookingOptions}
              placeholder="Booking"
            />
            <Button
              className={styles.btn_add}
              text="+ Add New Booking"
              type="button"
              onClick={() => navigate("add-booking")}
            />
          </div>
        </section>
        <section>
          <Table
            headers={[
              "ID Booking",
              "User",
              "Instructure",
              "Class",
              "Category",
              "Status",
            ]}
            name="booking"
            datas={show ? show : datas}
            handleDetail={handleDetail}
            handleDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
};

export default Booking;
