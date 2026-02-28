import { ButtonUi } from "@/shared/ui/buttonUi/ButtonUi";
import { TextAreaUi } from "@/shared/ui/textAreaUi/TextAreaUi";
import { linkActionsStore } from "@/stores";
import { observer } from "mobx-react-lite";
import { FormEvent, KeyboardEvent, useState } from "react";
import s from "./message-input.module.scss";
import { TextUi } from "@/shared/ui/textUi/TextUi";
import { Link } from "react-router-dom";

export const MessageInput = observer(() => {
  const [inputValue, setInputValue] = useState("");
  const [isLinkShown, setIsLinkShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = linkActionsStore;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      await linkActionsStore.createLinkAction(inputValue);
      setIsLinkShown(true);
    } catch {
      setError("Ошибка при создании ссылки");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = (e.target as HTMLTextAreaElement).form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  const handleReset = () => {
    setInputValue("");
    setIsLinkShown(false);
    setError(null);
    linkActionsStore.id = "";
  };

  const generatedUrl = `http://localhost:5173/${id}`;

  return (
    <form className={s.style} onSubmit={handleSubmit}>
      {!isLinkShown ? (
        <>
          <TextAreaUi
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите пароль..."
            disabled={isLoading}
          />

          {error && <div className={s.error}>{error}</div>}

          <ButtonUi type="submit" disabled={!inputValue.trim() || isLoading}>
            {isLoading ? "Генерация..." : "Сгенерить ссылку"}
          </ButtonUi>
        </>
      ) : (
        <div className={s.result}>
          <div className={s.block}>
            <TextUi>Ссылка создана:</TextUi>
            <Link to={generatedUrl} className={s.link}>
              {generatedUrl}
            </Link>
          </div>
          <div className={s.actions}>
            <ButtonUi
              onClick={() => {
                navigator.clipboard.writeText(generatedUrl);
              }}
              className={s.copyBtn}
            >
              Копировать ссылку
            </ButtonUi>
            <ButtonUi onClick={handleReset} className={s.resetBtn}>
              Создать новую
            </ButtonUi>
          </div>
        </div>
      )}
    </form>
  );
});
