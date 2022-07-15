import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

/** Components */
import Header from "../../Header";

const MainLayout = () => {

  const user = JSON.parse(localStorage.getItem("token")).user;

  const [role, setRole] = useState("");

  useEffect(() => {
    user.roles?.forEach(item => {
      if (item === "ROLE_SUPER_ADMIN") {
        setRole("Super Admin");
      }
      else if (item === "ROLE_ADMIN") {
        setRole("Admin");
      }
    });
  }, []);

  return (
    <>
      <Header name={user.sub} role={role} />
      <Outlet />
    </>
  );
};

export default MainLayout;
