import { ComponentPropsWithoutRef, ReactNode } from "react";
import s from "./text.module.scss";

interface TextUiProps extends ComponentPropsWithoutRef<"p"> {
  children: ReactNode;
  center?: boolean;
}

export const TextUi = ({
  children,
  className,
  center,
  ...props
}: TextUiProps) => {
  const combinedClassName =
    `${s.text} ${center ? s.center : ""} ${className || ""}`.trim();

  return (
    <p className={combinedClassName} {...props}>
      {children}
    </p>
  );
};
