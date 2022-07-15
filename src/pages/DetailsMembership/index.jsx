import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { editMembership, getMemberById, getMembershipData } from "../../api";

/** Styles */
import styles from "./style.module.css";

/** Components */
import Container from "../../components/Layouts/Container";
import PageTitle from "../../components/PageTitle";
import Details from "../../components/Details";
import Form from "../../components/Form";
import Button from "../../components/Button";

/** Icon */
import { MdVerifiedUser } from "react-icons/md";

const DetailsMembership = () => {

  const navigate = useNavigate();

  const params = useParams();

  let priceIDR = Intl.NumberFormat("en-ID");

  const [data, setData] = useState({
    membershipId: "",
    status: "",
    user: {
      address: "",
      email: "",
      membership: "",
      name: "",
      phone: "",
    },
    class: ["Zumba A - Online", "Cardio A - Online"],
    member: {
      memberId: "",
      price: "",
    },
  });

  const [membershipSelectedOption, setMembershipSelectedOption] = useState("");

  const [membershipOptions, setMembershipOptions] = useState([]);

  const [inputs, setInputs] = useState([
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "",
      value: "",
      disable: true,
    },
  ]);

  useEffect(() => {
    getMemberById(params.id).then((response) => {
      setData(response.data);

      setInputs([
        {
          label: "Name",
          name: "name",
          type: "text",
          placeholder: response.data?.name,
          value: response.data?.name,
          disabled: true,
        },
      ]);
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
  }, [params.id]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(membershipSelectedOption);
  }, [membershipSelectedOption]);

  const handleSave = (e) => {
    e.preventDefault();

    if (membershipSelectedOption === "") {
      Swal.fire({
        title: "Error!",
        text: "Please select membership type",
        icon: "error",
      });
    }
    else if (membershipSelectedOption.label === data.memberName) {
      Swal.fire({
        title: "Error!",
        text: "Please select different membership type",
        icon: "error",
      });
    }
    else {
      const selected = membershipSelectedOption;

      Swal.fire({
        title: "Upgrade Membership Payment",
        html: `
        <div>
          <div class="alert-container ${selected.label}">
            <div class="alert-wrap">
              <h4>SPORTLY</h4>
            </div>
            <div class="alert-wrap second">
              <p class="alert-title">${data.username}</p>
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
          editMembership({
            membershipId: data?.membershipId,
            userId: data?.userId,
            memberId: membershipSelectedOption.value,
          }).then(navigate("/membership"));
          Swal.fire("Success!", "Membership Upgraded!", "success");
        }
      });
    }
  };

  return (
    <div className={styles.content_wrapper}>
      <PageTitle icon={<MdVerifiedUser />} title="Membership" />
      <Container title={"Details Membership"}>
        <div className="container no-pl mt-2">
          <div className="row">
            <div className="col">
              <Details title={"ID Membership"} text={data?.membershipId} />
              <Details title={"Name"} text={data?.name} />
              <Details title={"Email"} text={data?.email} />
            </div>
            <div className="col">
              <Details title={"Contact"} text={data?.contact} />
              <Details title={"Address"} text={data?.address} />
              <Details title={"Membership"} text={data?.memberName} />
            </div>
            <div className="col">
              {data?.status === true ? (
                <Details title={"Status"} text={"Active"} />
              ) : (
                <Details title={"Status"} red={true} text={"Not - Active"} />
              )}
            </div>
          </div>
        </div>
      </Container>
      <Container title={"Edit Membership"}>
        <div className="container mt-3 no-pl">
          <form onSubmit={handleSave}>
            <div className="row">
              <div className="col">
                <Form inputs={inputs} setInputs={setInputs} />
              </div>
              <div className="col">
                <label className="label mt-4"> Membership</label>
                <Select
                  className={`mt-3 ${styles.select_input}`}
                  defaultValue={membershipSelectedOption}
                  onChange={setMembershipSelectedOption}
                  options={membershipOptions}
                  placeholder={data.memberName}
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
    </div>
  );
};

export default DetailsMembership;
