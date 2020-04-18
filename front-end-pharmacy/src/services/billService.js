import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/bill/";

function billUrl(id) {
  return `${apiEndpoint}${id}`;
}

export function getBills() {
  const bills = http.get(apiEndpoint);
  console.log(bills);
  return bills;
}

export function getBill(billId) {
  const bill = http.get(billUrl(billId));
  console.log(bill);
  return bill;
}

export function saveBill(bill) {
  return http.post(apiEndpoint, bill);
}

export function deleteBill(billId) {
  console.log(billId);
  http.delete(billUrl(billId));
}
