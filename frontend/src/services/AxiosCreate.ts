import axios from "axios";
import store from "../store";

export const axiosJWT = async (baseUrl: string) => {
  const newAxios = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  newAxios.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => Promise.reject(error)
  );

  newAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(error);
      const state = store.getState();
      const user = state.user.user;
      const originalRequest = error.config;

      if (originalRequest.url.includes("/login")) {
        return Promise.reject(error);
      }
      console.log("Intercepted response error:", error);
      if (
        !originalRequest._retry &&
        user &&
        error.response?.data?.code === "TOKEN_EXPIRED"
      ) {
        console.log("Access token expired, attempting to refresh...");

        try {
          await axios.post(
            "/adminuser_api/refreshtoken",
            {},
            { withCredentials: true }
          );
          return newAxios(error.config);
        } catch (refreshError) {
          console.error("Refresh token failed. Logging out...");
          console.log(refreshError);
          window.location.href = "/login";
          alert("Login session expires");
          window.localStorage.removeItem("user");
        }
      }

      return Promise.reject(error);
    }
  );
  return newAxios;
};
