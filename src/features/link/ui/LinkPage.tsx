// src/features/link-page/ui/LinkPage.tsx
import { linkActionsStore } from '@/stores'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import s from './link-page.module.scss'

export const LinkPage = observer(() => {
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      linkActionsStore.getLinkAction(id)
    }
  }, [id])

  const { isLoading, error, password } = linkActionsStore

  if (isLoading) {
    return (
      <div className={s.container}>
        <div className={s.loader}>Загрузка парол...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={s.container}>
        <h2>Ошибка</h2>
        <p className={s.error}>{error}</p>
        <Link to="/" className={s.link}>→ Вернуться на главную</Link>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <h2>Ваш пароль</h2>
      <code className={s.password}>{password}</code>
      <div className={s.actions}>
        <button
          onClick={() => navigator.clipboard.writeText(password)}
          className={s.btn}
        >
          Копировать
        </button>
        <Link to="/" className={s.link}>→ Создать новый</Link>
      </div>
    </div>
  )
})