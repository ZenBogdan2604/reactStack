import { makeAutoObservable } from 'mobx'
import { ICreateLinkResponse, IGetLinkResponse } from './types'
import { PATH_API } from '@/shared/consts'

class LinkActionsStore {
  constructor() { makeAutoObservable(this) }

  password = ""
  link = ""
  id = ""


  createLinkAction = async (password: string) => {
    try {
      const body = JSON.stringify({ password })
      const res = await fetch(`${PATH_API}/links`, {
        method: "POST",
        body
      })

      console.log("from createLinkAction", res.ok)
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`)
      }
      const result = await res.json() as ICreateLinkResponse
      this.id = result.id
      console.log(result)
    } catch (error) {
      if (error instanceof Error) {
        console.error("createLinkAction", error.message)
      } else {
        console.error("Неизвестная ошибка:", error)
      }
    }
  }

  getLinkAction = async () => {
    try {
      const res = await fetch(`${PATH_API}/links/${this.id}`)

      console.log("from getLinkAction", res.ok)
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`)
      }
      const result = await res.json() as IGetLinkResponse
      this.password = result.password
      console.log(result)
    } catch (error) {
      console.error("ERROR CREATE LINK ACTION", error)
    }
  }
}

export const linkActionsStore = new LinkActionsStore()
