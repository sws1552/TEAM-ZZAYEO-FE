//Auth.js

//카카오 로그인
const CLIENT_ID = "4641f166c67ceb5a3f1704e368e23561";
const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
