import s from "./error-text.module.scss"

interface ErrorTextUiProps {
  text: string
  variant?: "default" | "border"
}

export const ErrorTextUi = ({ text, variant = "default" }: ErrorTextUiProps) => {
  return (
    <p className={`error-text ${s[variant]}`}>{text}</p>
  )
}
