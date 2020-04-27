import http from "./httpService";
import { apiUrl } from "../config.json";
import auth from "./authService";
import axios from "axios";

const apiEndpoint = apiUrl + "/supplier/";

// axios.interceptors.request.use(function (config) {
//   const token = auth.getJwt();
//   config.headers.Authorization =  token;

//   return config;
// });

function supplierUrl(id) {
  return `${apiEndpoint}${id}`;
}

export function getSuppliers(user) {
  console.log(user)
  const suppliers = http.get(apiEndpoint,{params:{username:user}});
  console.log(suppliers);
  return suppliers;
}

export function getSupplier(supplierId) {
  const supplier = http.get(supplierUrl(supplierId));
  console.log(supplier);
  return supplier;
}

export function saveSupplier(supplier) {
  if (supplier.id) {
    const body = { ...supplier };
    delete body.id;
    //return http.put(supplierUrl(supplier.id), body);
    return http.post(apiEndpoint, supplier);
  }
}

export function deleteSupplier(supplierId) {
  console.log(supplierId);
  http.delete(supplierUrl(supplierId));
}
