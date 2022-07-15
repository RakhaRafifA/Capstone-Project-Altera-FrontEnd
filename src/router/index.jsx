import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import SuperAdmin from "./SuperAdmin";

/** Pages */
import Login from "../pages/Login";
import Membership from "../pages/Membership";
import DetailsMembership from "../pages/DetailsMembership";
import AddMembership from "../pages/AddMembership";
import NotFound from "../pages/NotFound";
import Class from "../pages/Class";
import AddClass from "../pages/AddClass";
import DetailsClass from "../pages/DetailsClass";
import Booking from "../pages/Booking";
import AddBooking from "../pages/AddBooking";
import DetailsBooking from "../pages/DetailsBooking";
import MainLayout from "../components/Layouts/MainLayout";
import User from "../pages/User";
import DetailsUser from "../pages/DetailsUser";
import AddUser from "../pages/AddUser";
import Admin from "../pages/Admin";
import AddAdmin from "../pages/AddAdmin";
import DetailsAdmin from "../pages/DetailsAdmin";
import Dashboard from "../pages/Dashboard";
import Newsletter from "../pages/NewsLetter";
import Content from "../pages/Content";

const GlobalRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="user" element={<MainLayout />}>
          <Route index element={<User />} />
          <Route path="details-user/:id" element={<DetailsUser />} />
          <Route path="add-user" element={<AddUser />} />
        </Route>
        <Route path="membership" element={<MainLayout />}>
          <Route index element={<Membership />} />
          <Route
            path="details-membership/:id"
            element={<DetailsMembership />}
          />
          <Route path="add-membership" element={<AddMembership />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="class" element={<MainLayout />}>
          <Route index element={<Class />} />
          <Route path="add-class" element={<AddClass />} />
          <Route path="details-class/:id" element={<DetailsClass />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="booking" element={<MainLayout />}>
          <Route index element={<Booking />} />
          <Route path="add-booking" element={<AddBooking />} />
          <Route path="details-booking/:id" element={<DetailsBooking />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<SuperAdmin />}>
          <Route path="admin" element={<MainLayout />}>
            <Route index element={<Admin />} />
            <Route path="add-admin" element={<AddAdmin />} />
            <Route path="details-admin/:id" element={<DetailsAdmin />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="newsletter" element={<MainLayout />}>
          <Route index element={<Newsletter />} />
        </Route>

        <Route path="content" element={<MainLayout />}>
          <Route index element={<Content />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default GlobalRoutes;
