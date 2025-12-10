import {
  redirectToKakaoLogin,
  redirectToNaverLogin,
  redirectToGoogleLogin,
} from "@/data/socialLogin";

function SocialLogin() {
  return (
    <div className="h-screen flex flex-col gap-3 justify-center items-center">
      <img
        src="/src/assets/images/kakaoLoginBtn.png"
        alt="카카오로그인버튼"
        onClick={redirectToKakaoLogin}
        className="w-60 h-10"
      />
      <img
        src="/src/assets/images/naverLoginbtn.png"
        alt="네이버로그인버튼"
        onClick={redirectToNaverLogin}
        className="w-60 h-10"
      />
      <img
        src="/src/assets/images/googleLoginbtn.png"
        alt="구글로그인버튼"
        onClick={redirectToGoogleLogin}
        className="w-60 h-10"
      />
    </div>
  );
}

export default SocialLogin;
