import { linkActionsStore } from '@/stores'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import s from './link-page.module.scss'

export const LinkPage = observer(() => {
  const { id } = useParams<{ id: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [isExpired, setIsExpired] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { password } = linkActionsStore

  useEffect(() => {
    if (!id) {
      setError('Некорректная ссылка')
      setIsLoading(false)
      return
    }

    const fetchPassword = async () => {
      try {
        linkActionsStore.id = id
        await linkActionsStore.getLinkAction()

        if (!linkActionsStore.password) {
          setIsExpired(true)
        }
      } catch (e) {
        const status = (e as Error).message.includes('404')
          || (e as Error).message.includes('410')
        if (status) {
          setIsExpired(true)
        } else {
          setError('Не удалось загрузить пароль')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPassword()
  }, [id])

  if (isLoading) {
    return (
      <div className={s.container}>
        <div className={s.loader}>Проверка ссылки...</div>
      </div>
    )
  }

  if (isExpired) {
    return (
      <div className={s.container}>
        <p className={s.expired}>Ссылка уже была использована</p>
        <p className={s.hint}>Одноразовые ссылки сгорают после первого просмотра</p>
        <Link to="/" className={s.link}>Создать свою ссылку</Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className={s.container}>
        <p className={s.error}>{error}</p>
        <Link to="/" className={s.link}>Вернуться на главную</Link>
      </div>
    )
  }



  return (
    <div className={s.container}>
      <p>Ваш пароль:</p>
      <code className={s.password}>{password}</code>
      <div className={s.actions}>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(password)}
          className={s.btn}
        >
          Копировать
        </button>
        <Link to="/" className={s.link}>Создать новый</Link>
      </div>
    </div>
  )
})