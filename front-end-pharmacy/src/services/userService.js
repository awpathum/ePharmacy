import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/register";

export function register(user) {
  console.log(user.username);
  console.log(user.password);
  return http.post(apiEndpoint, {
    username: user.username,
    password: user.password
  });
}
