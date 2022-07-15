import { Outlet } from "react-router-dom";

/** Component */
import NotFound from "../pages/NotFound";

const SuperAdmin = () => {
  const data = JSON.parse(localStorage.getItem("token"));

  return data ? (
    <>
      {data.user.roles[0] === "ROLE_SUPER_ADMIN" ? <Outlet /> : <NotFound />}
    </>
  ) : (
    <NotFound />
  );
};

export default SuperAdmin;
