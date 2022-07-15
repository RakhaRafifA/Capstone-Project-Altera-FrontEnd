import { Outlet } from "react-router-dom";

/** Component */
import Navbar from "../components/Navbar";
import NotFound from "../pages/NotFound";

const PrivateRoutes = () => {
  const data = JSON.parse(localStorage.getItem("token"));

  const role = data?.user.roles[0];

  return data ? (
    <>
      {role === "ROLE_SUPER_ADMIN" || role === "ROLE_ADMIN" ? (
        <>
          {role === "ROLE_SUPER_ADMIN" ? (
            <div className="private-routes-container">
              <Navbar withMember={true} />
              <div className="private-routes-wrapper">
                <Outlet />
              </div>
            </div>
          ) : (
            <div className="private-routes-container">
              <Navbar />
              <div className="private-routes-wrapper">
                <Outlet />
              </div>
            </div>
          )}
        </>
      ) : (
        <NotFound />
      )}
    </>
  ) : (
    <NotFound />
  );
};

export default PrivateRoutes;
