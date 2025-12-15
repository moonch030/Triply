import CommonLayout from "@/components/common/CommonLayout";
import SocialLoginBtnGrp from "./SocialLoginBtnGrp";

function SocialLogin() {
  return (
    <CommonLayout
      title="지금 트리플리와 여행을 시작하세요!"
      subTitle="AI 플리의 도움으로 여행 계획을 더 쉽고 빠르게 만들 수 있어요!"
      children={<SocialLoginBtnGrp />}
    />
  );
}

export default SocialLogin;
