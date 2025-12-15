import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-[#0078EF] text-white hover:bg-[#0078EF]/90",
        destructive:
          "bg-[#E23939] text-white hover:bg-[#E23939]/90 focus-visible:ring-red-500/20",
        cancel: "bg-[#B4B6C1] text-white hover:bg-[#B4B6C1]/90",
        outline:
          "border border-[#0078EF] bg-white text-[#0078EF] hover:bg-blue-50",
        secondary: "bg-[#DBEAFE] text-[#0048B4] hover:bg-[#EFF6FF]",
        ghost: "bg-transparent text-[#0078EF] hover:bg-blue-50",
        link: "text-[#0078EF] underline-offset-4 hover:underline",

        a: "bg-[#3C5883] text-white hover:bg-[#3C5883]/90",
        b: "bg-[#4883CF] text-white hover:bg-[#4883CF]/90",
        c: "bg-[#6BA9DD] text-white hover:bg-[#6BA9DD]/90",

        d: "bg-[#E6F4F1] text-white hover:bg-[#E6F4F1]/90",
        e: "bg-[#001F7D] text-white hover:bg-[#001F7D]/90",
        f: "bg-[#EEE8A9] text-white hover:bg-[#EEE8A9]/90",
        g: "bg-[#B4B6C1] text-white hover:bg-[#B4B6C1]/90",
        h: "bg-[#434656] text-white hover:bg-[#434656]/90",
      },
      size: {
        xs: "h-7 px-2.5 py-1.5 text-[0.75rem] has-[>svg]:px-2", // 12px
        s: "h-8 px-3 py-2 text-[0.875rem] has-[>svg]:px-2.5", // 14px
        md: "h-9 px-4 py-2 text-[1rem] has-[>svg]:px-3", // 16px
        lg: "h-10 px-6 py-3 text-[1.125rem] has-[>svg]:px-4", // 18px
        xl: "h-12 px-8 py-8 text-[1.25rem] font-bold has-[>svg]:px-6", // 20px
        icon: "size-9 text-[1rem]", // 아이콘 버튼 기본 폰트 16px
        "icon-sm": "size-8 text-[0.875rem]", // 14px
        "icon-lg": "size-10 text-[1.125rem]", // 18px
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md", // 이제 기본 사이즈는 m으로 설정
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
