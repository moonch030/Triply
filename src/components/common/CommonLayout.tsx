import { type ReactNode } from "react";

type CommonLayoutProps = {
  title: string;
  subTitle?: string;
  children: ReactNode;
};

const CommonLayout = ({ ...props }: CommonLayoutProps) => {
  return (
    <section className="flex justify-center py-20 h-screen">
      <div className="flex flex-col justify-between w-[1200px]">
        <div className="flex flex-col gap-3 text-center">
          <h1>{props.title}</h1>
          <h2>{props.subTitle}</h2>
        </div>
        {props.children}
      </div>
    </section>
  );
};

export default CommonLayout;
