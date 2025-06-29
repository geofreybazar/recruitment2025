import { axiosJWT } from "./AxiosCreate";

import type { User } from "../utilities/types";
import type { Credentials } from "../utilities/types";
import type { UserSchema } from "../utilities/zodSchema";

// const authCheck = async () => {
//   const apiClient = await axiosJWT("/adminuser_api");
//   const response = await apiClient.get("/authcheck");
//   return response.data;
// };

const login = async (credentials: Credentials) => {
  const apiClient = await axiosJWT("/adminuser_api");
  const response = await apiClient.post("/login", credentials);
  return response.data;
};

// const logout = async () => {
//   const apiClient = await axiosJWT("/adminuser_api");
//   const response = await apiClient.post("/logout");
//   return response.data;
// };

// const getLoggedInUser = async (): Promise<User> => {
//   const apiClient = await axiosJWT("/adminuser_api");
//   const response = await apiClient.get("/");
//   return response.data;
// };

// const updateUserInfo = async (data: UserSchema) => {
//   const apiClient = await axiosJWT("/adminuser_api");
//   const response = await apiClient.put("/upadateuser/", data);
//   return response.data;
// };

// const changePassword = async (data: any) => {
//   const apiClient = await axiosJWT("/adminuser_api");
//   const response = await apiClient.put(`/changepassword`, data);
//   return response.data;
// };

export default {
  login,
  // authCheck,
  // getLoggedInUser,
  // logout,
  // updateUserInfo,
  // changePassword,
};
