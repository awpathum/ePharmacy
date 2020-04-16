import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/supplier/";

function supplierUrl(id) {
  return `${apiEndpoint}${id}`;
}

export function getSuppliers() {
  const suppliers = http.get(apiEndpoint);
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
