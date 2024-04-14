import axios from "axios";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_PATH}/api`,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      handleLogout();
    }
    return Promise.reject(error);
  }
);

export default api;
