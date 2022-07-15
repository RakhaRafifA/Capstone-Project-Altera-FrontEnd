import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import {
  addMembership,
  getMembershipData,
  getUserData,
} from "../../api";

/** Components */
import Button from "../../components/Button";
import Container from "../../components/Layouts/Container";
import PageTitle from "../../components/PageTitle";

/** Icon */
import { MdVerifiedUser } from "react-icons/md";

/** Styles */
import styles from "./style.module.css";

const AddMembership = () => {

  const navigate = useNavigate();

  const [userSelectedOption, setUserSelectedOption] = useState([]);
  const [membershipSelectedOption, setMembershipSelectedOption] = useState([]);
  const [userOptions, setUserOptions] = useState(null);
  const [membershipOptions, setMembershipOptions] = useState(null);

  let priceIDR = Intl.NumberFormat("en-ID");

  useEffect(() => {
    getUserData().then((response) => {
      let temp = [];

      response.data.map((data) => {
        return temp.push({
          value: data.userId,
          label: `${data.userId} - ${data.name}`,
          name: data.name,
        });
      });
      setUserOptions(temp);
    });

    getMembershipData().then((response) => {
      let temp = [];
      response.data.map((data) => {
        return temp.push({
          value: data.memberId,
          label: data.name,
          price: data.price,
        });
      });

      setMembershipOptions(temp);
    });
  }, []);

  const handleAddMembership = (e) => {
    e.preventDefault();

    const selected = membershipSelectedOption;

    Swal.fire({
      title: "Payment Summary",
      html: `
      <div>
        <div class="alert-container ${selected.label}">
          <div class="alert-wrap">
            <h4>SPORTLY</h4>
          </div>
          <div class="alert-wrap second">
            <p class="alert-title">${userSelectedOption.name}</p>
            <p>${selected.label} Membership</p>
          </div>
        </div>
        <br/>
        <div>
          Price to Pay : Rp. ${priceIDR.format(selected.price)}
        </div>
      </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0583d2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Pay",
    }).then((result) => {
      if (result.isConfirmed) {
        addMembership({
          userId: userSelectedOption.value,
          memberId: membershipSelectedOption.value,
        }).then(navigate("/membership"));

        Swal.fire("Sucess!", "Membership registered!", "success");
      }
    });
  };

  return (
    <div className="content_wrapper">
      <PageTitle icon={<MdVerifiedUser />} title="Membership" />
      <Container title={"Add New Membership"}>
        <div className="container no-pl mt-4">
          <form onSubmit={handleAddMembership}>
            <div className="row">
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
              <div className="col">
                <label className="label">Membership</label>
                <Select
                  className={styles.select_input}
                  defaultValue={membershipSelectedOption}
                  onChange={setMembershipSelectedOption}
                  options={membershipOptions}
                  placeholder="Membership"
                />
              </div>
            </div>
            <span className={styles.button}>
              <Button
                text="Save"
                type="submit"
                onClick={(e) => {
                  handleAddMembership(e);
                }}
              />
            </span>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddMembership;
