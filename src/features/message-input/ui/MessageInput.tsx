import { TextAreaButtonUi } from '@/shared/ui/textAreaButtonUi/TextAreaButtonUi'
import { TextAreaUi } from '@/shared/ui/textAreaUi/TextAreaUi'
import { linkActionsStore } from '@/stores'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, FormEvent, useState } from 'react'
import s from './message-input.module.scss'

export const MessageInput = observer(() => {
  const [inputValue, setInputValue] = useState('')
  const [isLinkShown, setIsLinkShown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { id } = linkActionsStore

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      await linkActionsStore.createLinkAction(inputValue)
      setIsLinkShown(true)
    } catch {
      setError('Ошибка при создании ссылки')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const form = (e.target as HTMLTextAreaElement).form
      if (form) {
        form.requestSubmit()
      }
    }
  }

  const handleReset = () => {
    setInputValue('')
    setIsLinkShown(false)
    setError(null)
    linkActionsStore.id = ''
  }

  const generatedUrl = `http://localhost:5173/${id}`

  return (
    <form className={s.style} onSubmit={handleSubmit}>
      {!isLinkShown ? (
        <>
          <TextAreaUi
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Введите пароль..."
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
      ) : (
        <div className={s.result}>
          <div className={s.block}>
            <p>Одноразка создана:</p>
            <a
              href={generatedUrl}
              className={s.link}
            >
              {generatedUrl}
            </a>
          </div>
          <div className={s.actions}>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(generatedUrl)
              }}
              className={s.copyBtn}
            >
              Копировать ссылку
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