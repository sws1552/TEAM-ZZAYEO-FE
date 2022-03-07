import axios from "axios";

const instance = axios.create({

	baseURL: "http://3.34.131.246:3000"
	// baseURL: "https://77b56b3c-3120-4f89-9c26-a691e127a7c7.mock.pstmn.io"
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
