import http from "./httpService";
import { apiUrl } from "../config.json";
import { func } from "joi";

const apiEndpoint = apiUrl + "/bill/";

function billUrl(id) {
  return `${apiEndpoint}${id}`;
}

export function getBills(user) {
  console.log(user)
  const drugs = http.get(apiEndpoint,{params:{username:user}});
  return drugs;
}

export function getBill(billId) {
  const bill = http.get(billUrl(billId));
  console.log(bill);
  return bill;
}

export function saveBill(bill) {
  console.log(bill)
  return http.post(apiEndpoint, bill);
}

export function addDrugs(drugs) {
  console.log("drugs", drugs);
  console.log(apiEndpoint + "addDrugs");
  return http.post(apiEndpoint + "addDrugs", drugs);
}

export function deleteBill(billId) {
  console.log(billId);
  http.delete(billUrl(billId));
}

export function getDrugs(billId) {
  console.log('malURL',apiUrl+ 'billDrugs/' + `${billId}`)
  return http.get(apiUrl+ '/billDrugs/' + `${billId}`)
}
