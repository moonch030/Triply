import { redirectToKakaoLogin, redirectToNaverLogin, redirectToGoogleLogin } from "@/data/socialLogin";
import { SocialLoginButton } from "./SocialLoginButton";

const SocialLoginBtnGrp = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <p className="text-[13px] text-[#434656] font-bold">3초만에 시작하기</p>
      {/** 카카오 로그인 */}
      <SocialLoginButton
        provider="kakao"
        icon={
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 0.6C4.03 0.6 0 3.71 0 7.55c0 2.39 1.56 4.49 3.93 5.74l-1 3.65c-.08.32.29.58.57.39l4.38-2.89c.37.04.74.06 1.12.06 4.97 0 9-3.11 9-6.95C18 3.71 13.97.6 9 .6Z"
              fill="#171717"
            />
          </svg>
        }
        onClick={redirectToKakaoLogin}
      />

      {/** 네이버 로그인 */}
      <SocialLoginButton
        provider="naver"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10.8491 8.56267L4.91687 0H0V16H5.15088V7.436L11.0831 16H16V0H10.8491V8.56267Z"
              fill="white"
            />
          </svg>
        }
        onClick={redirectToNaverLogin}
      />

      {/** 구글 로그인 */}
      <SocialLoginButton
        provider="google"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.199 10.218C19.199 9.53849 19.138 8.88509 19.0248 8.25781H9.99902V11.9648H15.1566C14.9344 13.1627 14.2593 14.1777 13.2443 14.8572V17.2618H16.3414C18.1536 15.5934 19.199 13.1366 19.199 10.218Z"
              fill="#4285F4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.99859 19.5828C12.5861 19.5828 14.7554 18.7247 16.341 17.261L13.2439 14.8565C12.3857 15.4315 11.288 15.7713 9.99859 15.7713C7.50256 15.7713 5.38987 14.0855 4.63627 11.8203H1.43457V14.3033C3.01146 17.4353 6.25237 19.5828 9.99859 19.5828Z"
              fill="#34A853"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.63704 11.8238C4.44537 11.2488 4.33647 10.6346 4.33647 10.003C4.33647 9.37138 4.44537 8.75717 4.63704 8.18217V5.69922H1.43533C0.786281 6.99297 0.416016 8.4566 0.416016 10.003C0.416016 11.5494 0.786281 13.013 1.43533 14.3068L4.63704 11.8238Z"
              fill="#FBBC05"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.99859 4.22952C11.4056 4.22952 12.6689 4.71304 13.662 5.66267L16.4107 2.91399C14.751 1.36759 12.5817 0.417969 9.99859 0.417969C6.25237 0.417969 3.01146 2.56551 1.43457 5.69751L4.63627 8.18047C5.38987 5.91532 7.50256 4.22952 9.99859 4.22952Z"
              fill="#EA4335"
            />
          </svg>
        }
        onClick={redirectToGoogleLogin}
      />
    </div>
  );
};

export default SocialLoginBtnGrp;
