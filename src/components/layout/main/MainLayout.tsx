import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="default"
        size="xl"
        onClick={() => navigate({ to: "/auth/login" })}
      >
        로그인
      </Button>
      <Button
        variant="default"
        size="xl"
        onClick={() => navigate({ to: "/plan" })}
      >
        지도
      </Button>
      <Button variant="secondary" size="xl">
        플리와 함께 알아보기
      </Button>
      <Button variant="secondary" size="xl">
        직접 찾아보기
      </Button>
    </div>
  );
};

export default MainLayout;
