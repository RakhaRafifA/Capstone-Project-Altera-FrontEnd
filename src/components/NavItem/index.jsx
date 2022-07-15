import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

/** Styles */
import styles from "./style.module.css";

const NavItems = ({ logo, name, link, id }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0583d2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire("Logged Out!", "You have been logged out.", "success");
        navigate("/login");
      }
    });
  };

  return (
    <>
      {name === "Logout" ? (
        <NavLink
          to="#"
          key={id}
          onClick={handleLogout}
          className={styles.container}
        >
          <div className={styles.logo}>{logo}</div>
          <div className={styles.name}>{name}</div>
        </NavLink>
      ) : (
        <NavLink
          to={`${link}`}
          className={styles.container}
          key={id}
          style={({ isActive }) => {
            return {
              color: isActive ? "var(--primary)" : "",
              borderRight: isActive ? "5px solid var(--primary)" : "",
            };
          }}
        >
          <div className={styles.logo}>{logo}</div>
          <div className={styles.name}>{name}</div>
        </NavLink>
      )}
    </>
  );
};

export default NavItems;
