import { linkActionsStore } from "@/stores";
import s from "./link-text.module.scss";
import { Link } from "react-router-dom";

interface LinkTextUiProps {
  text?: string;
}

export const LinkTextUi = ({
  text = "Здесь должна быть ваша ссылка!",
}: LinkTextUiProps) => {
  const { id } = linkActionsStore;
  const link = "http://localhost:5173/" + id;

  return (
    <Link className={s.link} to={link}>
      {!id ? text : link}
    </Link>
  );
};
