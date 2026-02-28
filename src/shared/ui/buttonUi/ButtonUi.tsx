import { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./text-area-button.module.scss";

interface ButtonUiProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const ButtonUi = ({ disabled, children, ...props }: ButtonUiProps) => {
  return (
    <div className={s.button_area}>
      <button className={s.button} disabled={disabled} {...props}>
        {children}
      </button>
    </div>
  );
};
