import { socialLoginApi } from "@/api/login.api";
import ComponentsDemo from "@/components/layout/ComponentsDemo";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    const getKakaoToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (!code) return;

      const REST_API_KEY = "9fb42f587f152ab87d2a9a389653ef43";
      const REDIRECT_URI = "http://localhost:5173/";
      const SECRET_KEY = "MYKNe5qSvb8zwR1NxKn7gP79OtHxnbQu";

      try {
        const res = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code,
            client_secret: SECRET_KEY,
          }),
        });

        const data = await res.json();
        console.log("카카오 access_token 응답:", data);

        // 서버에 access_token 전송
        const kakaoLogin = await socialLoginApi({
          token: data.access_token,
          provider: "KAKAO",
        });

        console.log(kakaoLogin)

      } catch (err) {
        console.error("카카오 토큰 요청 에러:", err);
      }
    };

    getKakaoToken();
  }, []);

  return <ComponentsDemo />;
}
