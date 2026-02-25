import { TextAreaButtonUi } from '@/shared/ui/textAreaButtonUi/TextAreaButtonUi'
import { TextAreaUi } from '@/shared/ui/textAreaUi/TextAreaUi'
import { linkActionsStore } from '@/stores'
import { ChangeEvent, useState } from 'react'
import s from './message-input.module.scss'

export const MessageInput = () => {
  const [password, setPassword] = useState('')
  const { createLinkAction } = linkActionsStore

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: ChangeEvent) => {
    e.preventDefault()
    console.log('Отправка данных', password)
    await createLinkAction(password)
    setPassword('')
  }

  const isDisabled = !password.trim()

  return (
    <form className={s.style} onSubmit={handleSubmit}>
      <TextAreaUi
        value={password}
        onChange={handleChange}
        placeholder='Введите сообщение...'
      />

      <TextAreaButtonUi
        disabled={isDisabled}
        children="Сгенерить ссылку"
      />
    </form>
  )
}
