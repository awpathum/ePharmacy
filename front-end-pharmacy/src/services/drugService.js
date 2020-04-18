import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/drug/";

function drugUrl(id) {
  return `${apiEndpoint}${id}`;
}

export function getDrugs() {
  const drugs = http.get(apiEndpoint);
  console.log(drugs);
  return drugs;
}

export function getDrug(drugId) {
  const drug = http.get(drugUrl(drugId));
  console.log(drug);
  return drug;
}

export function saveDrug(drug) {
  return http.post(apiEndpoint, drug);
}

export function deleteDrug(drugId) {
  console.log(drugId);
  http.delete(drugUrl(drugId));
}
