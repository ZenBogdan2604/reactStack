import { linkActionsStore } from '@/stores'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, FormEvent, useState } from 'react'

import { TextAreaButtonUi } from '@/shared/ui/textAreaButtonUi/TextAreaButtonUi'
import { TextAreaUi } from '@/shared/ui/textAreaUi/TextAreaUi'
import s from './message-input.module.scss'

export const MessageInput = observer(() => {
  const [inputValue, setInputValue] = useState('')
  const [isLinkShown, setIsLinkShown] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const { isLoading, error, id, password } = linkActionsStore

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    try {
      const createResult = await linkActionsStore.createLinkAction(inputValue)

      await linkActionsStore.getLinkAction(createResult.id)

      setIsLinkShown(true)
      setIsPasswordShown(true)

    } catch (err) {
      alert(linkActionsStore.error || 'Ошибка при генерации')
    }
  }

  const handleReset = () => {
    setInputValue('')
    setIsLinkShown(false)
    setIsPasswordShown(false)
    linkActionsStore.reset()
  }

  const generatedUrl = `http://localhost:5173/${id}`

  return (
    <form className={s.style} onSubmit={handleSubmit}>

      {!isLinkShown && (
        <>
          <TextAreaUi
            value={inputValue}
            onChange={handleChange}
            placeholder="Введите секрет..."
            disabled={isLoading}
          />

          {error && <div className={s.error}>{error}</div>}

          <TextAreaButtonUi
            type="submit"
            disabled={!inputValue.trim() || isLoading}
          >
            {isLoading ? 'Генерация...' : 'Сгенерить ссылку'}
          </TextAreaButtonUi>
        </>
      )}

      {isLinkShown && isPasswordShown && (
        <div className={s.result}>
          <div className={s.block}>
            <p>Ссылка создана:</p>
            <a
              href={generatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              {generatedUrl}
            </a>
          </div>

          <div className={s.block}>
            <p>Ваш пароль:</p>
            <code className={s.password}>{password}</code>
          </div>

          <div className={s.actions}>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(password)}
              className={s.copyBtn}
            >
              копировать пароль
            </button>
            <button
              type="button"
              onClick={handleReset}
              className={s.resetBtn}
            >
              Создать новую
            </button>
          </div>
        </div>
      )}
    </form>
  )
})