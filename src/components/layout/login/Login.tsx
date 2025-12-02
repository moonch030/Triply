function Login() {

    const handleKakaoLogin = () => {
        // window.location.href = VITE_KAKAO_URL;
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
