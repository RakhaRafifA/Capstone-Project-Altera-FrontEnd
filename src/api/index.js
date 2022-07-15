import axios from "axios";

const CONFIG = {
  withCredentials: true,
};

const auth = () => {
  const headers = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")).token
        }`,
      "Content-Type": "application/json",
    },
  };

  return headers;
};

export const getLoginToken = async (payload) => {
  const { username, password } = payload;

  return axios.post(
    `/auth/login?username=${username}&password=${password}`,
    JSON.stringify({
      username: username,
      password: password,
    }),
    CONFIG
  );
};

export const getUserData = async () => {
  return axios.get("/capstone/user/userAccess/findAllRoleUser", auth());
};

export const getUserDataById = async (id) => {
  return axios.get(
    `/capstone/user/userAccess/getUserById?userId=${id}`,
    auth()
  );
};

export const getUserByUsername = async (username) => {
  return axios.get(
    `capstone/user/userAccess/getUserByUsername?username=${username}`,
    auth()
  );
};

export const addUserData = async (payload) => {
  const { name, username, password, email, phone, address } = payload;

  return axios.post(
    "capstone/user/adminAccess/createUser",
    JSON.stringify({
      name,
      username,
      password,
      email,
      phone,
      address,
      imageUrl: "string",
    }),
    auth()
  );
};

export const deleteUserData = async (id) => {
  return axios.delete(`capstone/user/adminAccess/deleteUser/${id}`, auth());
};

export const editUserData = async (payload) => {
  const { id, name, phone, address } = payload;

  return axios.put(
    `capstone/user/userAccess/updateUser/${id}`,
    JSON.stringify({
      name,
      phone,
      address,
      imageUrl: "string",
    }),
    auth()
  );
};

export const getAdminData = async () => {
  return axios.get("/capstone/user/adminAccess/findAllRoleAdmin", auth());
};

export const addRoleToAdmin = async (username) => {
  return await axios.post(
    "/capstone/user/managerOnly/addRoleToUser",
    JSON.stringify({
      username,
      roleName: "ROLE_ADMIN",
    }),
    auth()
  );
};

export const getMembershipData = async () => {
  return await axios.get("/capstone/member/userAccess/getAllMember", auth());
};

export const addMembership = async ({ userId, memberId }) => {
  return await axios.post(
    "/capstone/membership/adminAccess/createNewMembership",
    JSON.stringify({
      userId,
      memberId,
      status: true,
    }),
    auth()
  );
};

export const getMember = async () => {
  return axios.get("/capstone/membership/adminAccess/getAllMembership", auth());
};

export const getMemberById = async (id) => {
  return await axios.get(
    `/capstone/membership/userAccess/getMembershipById?membershipId=${id}`,
    auth()
  );
};

export const editMembership = async ({ membershipId, userId, memberId }) => {
  return await axios.put(
    `/capstone/membership/adminAccess/updateMembership/${membershipId}`,
    JSON.stringify({
      userId,
      memberId,
    }),
    auth()
  );
};

export const deleteMembership = async (id) => {
  return await axios.delete(
    `/capstone/membership/adminAccess/deleteMembership/${id}`,
    auth()
  );
};

export const getNewsLetter = async () => {
  return await axios.get(
    "/capstone/newsletter/userAccess/getAllNewsletter",
    auth()
  );
};

export const addNewsLetter = async ({
  title,
  description,
  imageUrl,
  videoUrl,
}) => {
  return await axios.post(
    "/capstone/newsletter/adminAccess/createNewNewsletter",
    JSON.stringify({
      title,
      description,
      imageUrl: "",
      videoUrl: "",
    }),
    auth()
  );
};

export const getContent = async () => {
  return await axios.get("/capstone/content/userAccess/getAllContent", auth());
};

export const addContent = async ({
  title,
  description,
  imageUrl,
  videoUrl,
}) => {
  return await axios.post(
    "/capstone/content/adminAccess/createNewContent",
    JSON.stringify({
      title,
      description: "",
      imageUrl: "",
      videoUrl,
    }),
    auth()
  );
};

export const getSumUser = async () => {
  return axios.get("/capstone/user/adminAccess/countTotalUser", auth());
};

export const getSumMembership = async () => {
  return axios.get(
    "/capstone/membership/adminAccess/countTotalMembership",
    auth()
  );
};

export const getSumBooking = async () => {
  return axios.get("/capstone/booking/adminAccess/countTotalBooking", auth());
};

export const getClass = async () => {
  return await axios.get("/capstone/class/userAccess/getAllClass", auth());
};

export const deleteClass = async (id) => {
  return await axios.delete(
    `/capstone/class/adminAccess/deleteClass/${id}`,
    auth()
  );
};

export const addClass = async ({
  status,
  description,
  capacity,
  schedule,
  price,
  instructorId,
  categoryId,
  roomId,
  typeId,
}) => {
  return await axios.post(
    `/capstone/class/adminAccess/createNewClass`,
    JSON.stringify({
      status,
      name: "string",
      description,
      capacity,
      schedule,
      price,
      imageUrl: "string",
      instructorId,
      categoryId,
      roomId,
      typeId,
      videoUrl: "",
      meetUrl: "",
      rating: 0,
      hour: 0,
    }),
    auth()
  );
};

export const getRoom = async () => {
  return axios.get("/capstone/room/userAccess/getAllRoom", auth());
};

export const getInstructor = async () => {
  return axios.get("/capstone/instructor/userAccess/getAllInstructure", auth());
};

export const getType = async () => {
  return await axios.get("/capstone/type/userAccess/getAllType", auth());
};

export const getCategory = async () => {
  return await axios.get(
    "/capstone/category/userAccess/getAllCategory",
    auth()
  );
};

export const getClassById = async (id) => {
  return await axios.get(
    `/capstone/class/userAccess/getClassByIdDto?classId=${id}`,
    auth()
  );
};

export const editClass = async ({
  id,
  status,
  name,
  description,
  capacity,
  schedule,
  price,
  imageUrl,
  instructorId,
  categoryId,
  roomId,
  typeId,
}) => {
  return await axios.put(
    `/capstone/class/adminAccess/updateClass/${id}`,
    JSON.stringify({
      status,
      name: "string",
      description,
      capacity,
      schedule,
      price,
      imageUrl: "string",
      instructorId,
      categoryId,
      roomId,
      typeId,
    }),
    auth()
  );
};

export const getUserByClassId = async (id) => {
  return await axios.get(
    `/capstone/class/adminAccess/getUserByClassId?classId=${id}`,
    auth()
  );
};

export const getGraph = async () => {
  return await axios.get("/capstone/graph/adminAccess/getAllGraph", auth());
};

export const getBooking = async () => {
  return await axios.get("/capstone/booking/adminAccess/getAllBooking", auth());
};

export const getBookingById = async (id) => {
  return await axios.get(
    `/capstone/booking/userAccess/getBookingByIdDto?bookingId=${id}`,
    auth()
  );
};

export const addBooking = async ({ status, userId, classId }) => {
  return await axios.post(
    "/capstone/booking/userAccess/createNewBooking",
    JSON.stringify({
      status,
      userId,
      classId,
    }),
    auth()
  );
};

export const editBooking = async ({ id, status, userId, classId }) => {
  return await axios.put(
    `/capstone/booking/adminAccess/updateBooking/${id}`,
    JSON.stringify({
      status,
      userId,
      classId,
    }),
    auth()
  );
};

export const deleteBooking = async (id) => {
  return await axios.delete(
    `/capstone/booking/adminAccess/deleteBooking/${id}`,
    auth()
  );
};
