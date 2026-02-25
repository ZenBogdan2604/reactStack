import { linkActionsStore } from '@/stores'
import s from './link-text.module.scss'

export const LinkTextUi = () => {
  const { id } = linkActionsStore
  const link = "http://localhost:5173/" + id
  return (
    <a className={s.link} href={link}>{!id ? "Здесь должна быть ваша ссылка!" : link}</a>
  )
}
