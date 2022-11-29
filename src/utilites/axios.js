import axios from 'axios';
// ----------------------------------------------------------------------
const axiosInstance = axios.create({ baseURL: "http://localhost:5000",
    // headers: {
    //     AUTH_JWT: localStorage.getItem("jwt"),
    //     AUTH_JWT_REFRESH: localStorage.getItem("jwtRefresh"),
    // }
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong BRO')
);

export default axiosInstance