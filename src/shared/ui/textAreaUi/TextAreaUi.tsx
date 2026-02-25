import { TextareaHTMLAttributes } from 'react'
import s from './text-area.module.scss'

interface TextAreaUiProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: boolean
  placeholder?: string
}

export const TextAreaUi = ({ label, error, placeholder, ...props }: TextAreaUiProps) => {
  return (
    <div>
      <textarea className={s.text_Area} placeholder={placeholder} {...props} />
    </div>
  )
}