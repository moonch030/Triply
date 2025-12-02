function Login() {
  // const VITE_KAKAO_SECRET_KEY = import.meta.env.VITE_KAKAO_SECRET_KEY;
  // const VITE_KAKAO_REDIRECT_URL = import.meta.env.VITE_KAKAO_REDIRECT_URL;
  const VITE_KAKAO_SECRET_KEY = "CEq9rpT9UrDknCE5sv1e7J6INSMFR2Am";
  const VITE_REST_API_KEY = "9fb42f587f152ab87d2a9a389653ef43";
  const VITE_KAKAO_JS_KEY = "b471af2b2cef9936b00489002f0a47b8";
  // const VITE_KAKAO_REDIRECT_URL = 'https://www.triply.my/'
  const VITE_KAKAO_REDIRECT_URL = "http://localhost:5173/";

  // URL 조합
  const VITE_KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_REST_API_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URL}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = VITE_KAKAO_URL;
  };

  return (
    <div>
      <button onClick={handleKakaoLogin} className="KakaoButton">
        카카오 로그인
      </button>
    </div>
  );
}

export default Login;
