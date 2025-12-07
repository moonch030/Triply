import {
  getKakaoTokenApi,
//   getNaverTokenApi,
  socialLoginApi,
} from "@/api/login.api";

/** 카카오 소셜 로그인 */
export function getKakaoLoginUrl() {
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URL = import.meta.env.VITE_SOCIAL_KAKAO_REDIRECT_URL;

  return `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
}

export function redirectToKakaoLogin() {
  const url = getKakaoLoginUrl();
  window.location.href = url;
}

export const getKakaoToken = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (!code) return;

  const VITE_KAKAO_SECRET_KEY = import.meta.env.VITE_KAKAO_SECRET_KEY;
  const VITE_REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const VITE_SOCIAL_KAKAO_REDIRECT_URL = import.meta.env
    .VITE_SOCIAL_KAKAO_REDIRECT_URL;

  try {
    const response = await getKakaoTokenApi({
      grant_type: "authorization_code",
      client_id: VITE_REST_API_KEY,
      redirect_uri: VITE_SOCIAL_KAKAO_REDIRECT_URL,
      code: code,
      client_secret: VITE_KAKAO_SECRET_KEY,
    });

    await socialLoginApi({
      token: response.access_token,
      provider: "KAKAO",
    });
  } catch (err) {
    console.error("카카오 토큰 요청 에러:", err);
  }
};

/** 네이버 소셜 로그인 */

export function getNaverLoginUrl() {
  const CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const REDIRECT_URL = import.meta.env.VITE_SOCIAL_NAVER_REDIRECT_URL;

  const state = crypto.randomUUID();
  sessionStorage.setItem("naver_state", state);
  return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${state}`;
}

export function redirectToNaverLogin() {
  const url = getNaverLoginUrl();
  window.location.href = url;
}

export const getNaverToken = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const returnedState = params.get("state");
  if (!code) return;

//   const VITE_NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
//   const VITE_NAVER_CLIENT_SECRET = import.meta.env.VITE_NAVER_CLIENT_SECRET;

  const originalState = sessionStorage.getItem("naver_state");

  if (!originalState || !returnedState) {
    console.error("state 값이 없습니다.");
    return;
  }

  if (originalState !== returnedState) {
    console.error("네이버 로그인 state 값 불일치");
    return;
  }

  try {
    // const response = await getNaverTokenApi({
    //   grant_type: "authorization_code",
    //   client_id: VITE_NAVER_CLIENT_ID,
    //   client_secret: VITE_NAVER_CLIENT_SECRET,
    //   code: code,
    //   state: returnedState,
    // });

    await socialLoginApi({
      token: code,
      state: returnedState,
      provider: "NAVER",
    });

  } catch (err) {
    console.error("네이버 토큰 요청 에러:", err);
  }
};

/** 구글 소셜 로그인 */
