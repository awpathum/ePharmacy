import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/authenticate";
const tokenKey = "token";

export async function login(username, password) {
  console.log(username, password);
  const { data: jwt } = await http.post(apiEndpoint, { username, password });
  console.log("jwt", jwt.token);
  localStorage.setItem(tokenKey, jwt.token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  console.log(localStorage.getItem(tokenKey));
  //let jwt = "Bearer " + localStorage.getItem(tokenKey);
  const jwt = localStorage.getItem(tokenKey);
  return jwt;
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    null;
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
