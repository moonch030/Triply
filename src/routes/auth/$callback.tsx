import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useEffect } from "react";
import {
  getKakaoToken,
  getNaverToken,
  getGoogleToken,
} from "@/data/socialLogin";

export const Route = createFileRoute("/auth/$callback")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { callback } = useParams({ from: "/auth/$callback" });

  console.log(callback);

  const loginFlow = async () => {
    try {
      if (callback === "kakao") {
        await getKakaoToken();
      } else if (callback === "naver") {
        await getNaverToken();
      } else if (callback === "google") {
        await getGoogleToken();
      } else {
        throw new Error("지원하지 않는 provider: " + callback);
      }

      navigate({ to: "/" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loginFlow();
  }, []);

  return <div>로그인 처리 중입니다...</div>;
}
