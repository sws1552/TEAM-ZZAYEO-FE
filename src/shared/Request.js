import axios from "axios";

const token = localStorage.getItem("login-token");

const instance = axios.create({
  baseURL: "http://3.36.50.53:3000",
  // baseURL: "https://2a3fd3af-9615-47e1-be4a-4e899ee6da64.mock.pstmn.io"
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
// instance.defaults.headers.common["Authorization"] = USER_TOKEN;

// const is_cookie = getCookie("is_login") ? true : false
// const getcookie = getCookie("is_login")
// console.log(is_cookie)
// if(is_cookie) {
// 	instance.defaults.headers.common["Authorization"] = `Bearer ${getcookie}`

export default instance;
