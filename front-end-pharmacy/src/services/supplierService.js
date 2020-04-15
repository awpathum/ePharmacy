import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/supplier/";

function supplierUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getSuppliers() {
  return http.get(apiEndpoint);
}

export function getSupplier(supplierId) {
  return http.get(supplierUrl(supplierId));
}
export function saveSupplier(supplier) {
  if (supplier._id) {
    const body = { ...supplier };
    delete body._id;
    return http.put(supplierUrl(supplier._id), body);
  }
  return http.post(apiEndpoint, supplier);
}

export function deleteSupplier(supplierId) {
  http.delete(supplierUrl(supplierId));
}
