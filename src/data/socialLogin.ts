import { getKakaoTokenApi, socialLoginApi } from "@/api/login.api";

export function getKakaoLoginUrl() {
    const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URL;

    return `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
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
    const VITE_KAKAO_REDIRECT_URL = import.meta.env.VITE_KAKAO_REDIRECT_URL;

    try {
        const response = await getKakaoTokenApi(
            {
                grant_type: "authorization_code",
                client_id: VITE_REST_API_KEY,
                redirect_uri: VITE_KAKAO_REDIRECT_URL,
                code: code,
                client_secret: VITE_KAKAO_SECRET_KEY,
            }
        )

        await socialLoginApi({
            token: response.access_token,
            provider: "KAKAO",
        });

    } catch (err) {
        console.error("카카오 토큰 요청 에러:", err);
    }
};