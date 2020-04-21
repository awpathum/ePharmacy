import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/authenticate";

export function login(username, password) {
    console.log(username,password)
  return http.post(apiEndpoint, { username, password });
}
