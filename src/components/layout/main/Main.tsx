import CommonLayout from "../../common/CommonLayout";
// import ComponentsDemo from "../ComponentsDemo";
import MainLayout from "./MainLayout";

const Main = () => {
  return (
    <CommonLayout
      title="여행은 가볍게, 경험은 풍성하게 계획은 Triply!"
      subTitle="AI 플리의 도움으로 여행 계획을 빠르게 세우고, 친구와 함께 더 완벽하게 만들어 보세요!"
      // children={<ComponentsDemo />}
      children={<MainLayout />}
    />
  );
};

export default Main;
