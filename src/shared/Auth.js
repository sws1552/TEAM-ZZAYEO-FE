//Auth.js

//카카오 로그인
const CLIENT_ID = "05c11329e6009d884a248b7893b16fe4";
//REDIRECT_URI 주소 백엔드랑 주소일치시키기
const REDIRECT_URI =
  //   "http://jjayeo.s3-website.ap-northeast-2.amazonaws.com/api/auth/kakao/callback";
  // "http://localhost:3000/api/auth/kakao/callback";
"https://zzayeo.com/api/auth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

//네이버 로그인
const N_CLIENT_ID = "UAbzCreu51zu7lMTLLzS";
//REDIRECT_URI 주소 백엔드랑 주소일치시키기
const N_REDIRECT_URI = "http://localhost:3000/oauth/callback/naver";

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${N_CLIENT_ID}&state=state&redirect_uri=${N_REDIRECT_URI}`;
