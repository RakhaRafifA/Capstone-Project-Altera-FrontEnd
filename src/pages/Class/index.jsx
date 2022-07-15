import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import { deleteClass, getClass, getClassById } from "../../api";

/** Styles */
import styles from "./style.module.css";

/** Icon */
import { IoIosPeople } from "react-icons/io";

/** Components */
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Table from "../../components/Table";

const Class = () => {

  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState([]);

  const [classSelectedOption, setClassSelectedOption] = useState([]);
  const [classOptions, setClassOptions] = useState();

  useEffect(() => {
    getClass().then((response) => {
      setDatas(response.data);
      setShow(response.data);
    });
  }, []);

  useEffect(() => {
    setClassOptions([{ value: 0, label: "All" }]);

    datas?.map((data) => {
      let temp = {
        value: data.classId,
        label: `${data.classId} - ${data.typeName} ${data.roomName} ${data.categoryName}`,
      };
      return setClassOptions((oldData) => [...oldData, temp]);
    });
  }, [datas]);

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
        deleteClass(id).then(async () => {
          getClass().then((response) => {
            setDatas(response.data);
            setShow(response.data);
          });
        });
        Swal.fire("Deleted!", "Class has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    if (
      classSelectedOption.value === 0 ||
      classSelectedOption.value === undefined
    ) {
      getClass().then((response) => {
        setShow(response.data);
      });
    } else {
      getClassById(classSelectedOption.value).then((response) => {
        setShow([response.data]);
      });
    }
  }, [classSelectedOption]);

  const handleDetail = (id) => {
    navigate(`details-class/${id}`);
  };

  return (
    <div className={styles.content_wrapper}>
      <main>
        <PageTitle icon={<IoIosPeople />} title="Class" />
        <section className={styles.top_section}>
          <div className={styles.filter_wrapper_top}>
            <Select
              className={styles.select_input}
              defaultValue={classSelectedOption}
              onChange={setClassSelectedOption}
              options={classOptions}
              placeholder="Class"
            />
            <Button
              className={styles.btn_add}
              text="+ Add New Class"
              type="button"
              onClick={() => navigate("add-class")}
            />
          </div>
        </section>
        <section>
          {show ? (
            <Table
              headers={[
                "ID Class",
                "Room",
                "Instructure",
                "Type",
                "Category",
                "Status",
              ]}
              datas={show}
              name="class"
              handleDetail={handleDetail}
              handleDelete={handleDelete}
            />
          ) : (
            <Table
              headers={[
                "ID Class",
                "Room",
                "Instructure",
                "Type",
                "Category",
                "Status",
              ]}
              datas={datas}
              name="class"
              handleDetail={handleDetail}
              handleDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default Class;
