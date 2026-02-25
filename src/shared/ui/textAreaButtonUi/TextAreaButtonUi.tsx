import { ButtonHTMLAttributes, ReactNode } from 'react'
import s from './text-area-button.module.scss'

interface TextAreaButtonUiProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

export const TextAreaButtonUi = ({ disabled, children, ...props }: TextAreaButtonUiProps) => {
  return (
    <div className={s.button_area}>
      <button className={s.button} disabled={disabled} {...props}>{children}</button>
    </div>
  )
}
