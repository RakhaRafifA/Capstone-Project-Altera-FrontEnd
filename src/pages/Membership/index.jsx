import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";

import { deleteMembership, getMember, getMemberById } from "../../api";

/** Styles */
import styles from "./style.module.css";

/** Icon */
import { MdVerifiedUser } from "react-icons/md";

/** Components */
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Table from "../../components/Table";

const Membership = () => {
  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState(null);

  const [membershipOptions, setMembershipOptions] = useState([
    { value: 0, label: "All" },
  ]);
  const [membershipSelectedOption, setMembershipSelectedOption] = useState([]);

  useEffect(() => {
    getMember().then((response) => {
      setDatas(response.data);
      setShow(response.data);
    });
  }, []);

  useEffect(() => {
    setMembershipOptions([{ value: 0, label: "All" }]);
    datas?.map((data) => {
      let temp = {
        value: data.membershipId,
        label: `${data.membershipId} - ${data.name}`,
      };
      return setMembershipOptions((oldData) => [...oldData, temp]);
    });
  }, [datas]);

  useEffect(() => {
    if (
      membershipSelectedOption.value === 0 ||
      membershipSelectedOption.value === undefined
    ) {
      getMember().then((response) => {
        setShow(response.data);
      });
    } else {
      getMemberById(membershipSelectedOption.value).then((response) => {
        setShow([response.data]);
      });
    }
  }, [membershipSelectedOption]);

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
        deleteMembership(id).then(async () =>
          getMember().then((response) => {
            setDatas(response.data);
            setShow(response.data);
          })
        );
        Swal.fire("Deleted!", "Membership has been deleted.", "success");
      }
    });
  };

  const handleDetail = (id) => {
    navigate(`details-membership/${id}`);
  };

  return (
    <div className={styles.content_wrapper}>
      <main>
        <PageTitle icon={<MdVerifiedUser />} title="Membership" />
        <section className={styles.top_section}>
          <div className={styles.filter_wrapper}>
            <Select
              className={styles.select_input}
              defaultValue={membershipSelectedOption}
              onChange={setMembershipSelectedOption}
              options={membershipOptions}
              placeholder="Membership"
            />
          </div>
          <Button
            className={styles.btn_add}
            text="+ Add New Member"
            type="button"
            onClick={() => navigate("add-membership")}
          />
        </section>
        <section>
          {show ? (
            <Table
              headers={["ID", "Name", "Contact", "Membership", "Status"]}
              name="member"
              datas={show}
              handleDetail={handleDetail}
              handleDelete={handleDelete}
            />
          ) : (
            <Table
              headers={["ID", "Name", "Contact", "Membership", "Status"]}
              name="member"
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

export default Membership;
