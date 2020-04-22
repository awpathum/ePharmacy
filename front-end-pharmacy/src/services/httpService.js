import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
import auth from "./authService";

//axios.defaults.headers.common['Bearer'] =  auth.getJwt();

//axios.defaults.headers.common['Authorization']  = auth.getJwt();

// if (auth.getCurrentUser()) {
//   const token = auth.getJwt();
//   console.log(`Bearer ${token}` )
//   axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
// }

// axios.interceptors.request.use((request) => {
//   console.log(request);
//   if (auth.getCurrentUser()) {
//     const jwt = auth.getJwt();
//     console.log(jwt);
//     const token = `Bearer ${auth.getJwt()}`;

//     request.headers.Authorization = token;
//     console.log(request);
//     return request;
//   }
//   return request;
// });

axios.interceptors.request.use(
  (request) => {
    console.log(request);
    if (auth.getCurrentUser()) {
      const jwt = auth.getJwt();
      console.log(jwt);
      const token = `Bearer ${auth.getJwt()}`;

      request.headers.Authorization = token;
      console.log(request);
      return request;
    }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  console.log(auth.getJwt());
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    //console.log("Loggin the error", ex);
    logger.log(error);
    toast("An inexpected error occurred.");
  }
  return Promise.reject(error);
});

// setipAxiosInterceptors(){

//   let username = 'mamba'
//   let password = 'mamba123'
//   let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
//   axios.interceptors.request.use((config) => {
//      config.headers.authorization = basicAuthHeader;
//      return config;
//   });

// }

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
