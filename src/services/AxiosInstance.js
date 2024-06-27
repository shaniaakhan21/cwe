import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.response?.status === 401){
      localStorage.removeItem('token')
      window.location.href = "/";
      return;
    }
    return Promise.reject(error);
  });  

export default axiosInstance;
