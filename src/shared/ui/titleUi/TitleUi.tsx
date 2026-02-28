import s from "./title.module.scss";

export const TitleUi = ({ children, ...props }: { children: string }) => {
  return (
    <h1 className={s.title} {...props}>
      {children}
    </h1>
  );
};
