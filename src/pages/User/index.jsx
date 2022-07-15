import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { deleteUserData, getUserData, getUserDataById } from "../../api";

/** Styles */
import styles from "./style.module.css";

/** Icon */
import { FaUserCircle } from "react-icons/fa";

/** Components */
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Table from "../../components/Table";

const User = () => {
  const navigate = useNavigate();

  const [userSelectedOption, setUserSelectedOption] = useState([]);
  const [userOption, setUserOption] = useState([{ value: 0, label: "All" }]);
  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState(null);

  useEffect(() => {
    getUserData().then((response) => {
      setDatas(response.data);
      setShow(response.data);
    });
  }, []);

  useEffect(() => {
    setUserOption([{ value: 0, label: "All" }]);

    datas?.map((user) => {
      let temp = { value: user.userId, label: `${user.userId} - ${user.name}` };
      return setUserOption((oldData) => [...oldData, temp]);
    });
  }, [datas]);

  useEffect(() => {
    if (
      userSelectedOption.value === 0 ||
      userSelectedOption.value === undefined
    ) {
      getUserData().then((response) => {
        setShow(response.data);
      });
    } else {
      getUserDataById(userSelectedOption.value).then((response) => {
        setShow([response.data]);
      });
    }
  }, [userSelectedOption]);

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
        deleteUserData(id).then(async () =>
          getUserData().then((response) => {
            setDatas(response.data);
            setShow(response.data);
          })
        );

        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };

  const handleDetail = (id) => {
    navigate(`details-user/${id}`);
  };

  return (
    <div className={styles.content_wrapper}>
      <main>
        <PageTitle icon={<FaUserCircle />} title="User" />
        <section className={styles.top_section}>
          <div className={styles.filter_wrapper_top}>
            <Select
              className={styles.select_input}
              defaultValue={userSelectedOption}
              onChange={setUserSelectedOption}
              options={userOption}
              placeholder="User"
            />

            <Button
              className={styles.btn_add}
              text="+ Add New User"
              type="button"
              onClick={() => navigate("add-user")}
            />
          </div>
        </section>
        <section>
          {show ? (
            <Table
              name="user"
              headers={["ID", "Name", "Contact", "Email", "Address"]}
              datas={show}
              handleDetail={handleDetail}
              handleDelete={handleDelete}
            />
          ) : (
            <Table
              name="user"
              headers={["ID", "Name", "Contact", "Email", "Address"]}
              datas={datas}
              handleDetail={handleDetail}
              handleDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default User;
