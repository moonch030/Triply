import { cn } from "@/lib/utils";

type Provider = "kakao" | "google" | "naver";

type SocialLoginButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    provider: Provider;
    icon: React.ReactNode;
    label?: string;
  };

const PROVIDER_STYLE: Record<
  Provider,
  { bg: string; text: string }
> = {
  kakao: {
    bg: "bg-[#FEE500]",
    text: "text-black",
  },
  google: {
    bg: "bg-white border border-[#DADCE0]",
    text: "text-[#1F1F1F]",
  },
  naver: {
    bg: "bg-[#03C75A]",
    text: "text-white",
  },
};

const PROVIDER_LABEL: Record<Provider, string> = {
  kakao: "카카오로 시작하기",
  google: "Google 계정으로 시작하기",
  naver: "네이버로 시작하기",
};

export function SocialLoginButton({
  provider,
  icon,
  label,
  className,
  ...props
}: SocialLoginButtonProps) {
  const style = PROVIDER_STYLE[provider];

  return (
    <button
      type="button"
      className={cn(
        "relative flex items-center justify-center",
        "w-[600px] h-[50px] rounded-md",
        style.bg,
        style.text,
        "text-sm font-medium",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      <span className="absolute left-3 flex items-center">
        {icon}
      </span>

      <span className="pointer-events-none">
        {label ?? PROVIDER_LABEL[provider]}
      </span>
    </button>
  );
}
