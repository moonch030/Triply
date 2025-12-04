import { redirectToKakaoLogin } from "@/data/socialLogin";

function SocialLogin() {
  return (
    <div className="h-screen flex flex-col gap-3 justify-center items-center">
      <img src="/src/assets/images/kakaoLoginBtn.png" alt="카카오로그인버튼" onClick={redirectToKakaoLogin} />
    </div>
  );
}

export default SocialLogin;
