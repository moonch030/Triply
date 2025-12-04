import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { getKakaoToken } from "@/data/socialLogin";

export const Route = createFileRoute("/auth/callback")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const loginFlow = async () => {
    try {
      await getKakaoToken();
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
