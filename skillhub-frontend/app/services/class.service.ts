import type { Class, CreateClass } from "~/types"
import { Api, checkError } from "~/utils"

export class ClassService {
  private api: Api

  constructor() {
    this.api = new Api('/class')
  }

  public async create(data: CreateClass): Promise<void> {
    try {
      const res = await this.api.post('', data)
      await checkError(res)
    } catch (error) {
      throw error
    }
  }

  public async getAll(): Promise<Class[]> {
    try {
      const res = await this.api.get('')
      await checkError(res)

      return await res.json()
    } catch (error) {
      throw error
    }
  }

  public async getById(id: string): Promise<Class> {
    try {
      const res = await this.api.get(`/${id}`)
      await checkError(res)

      return res.json()
    } catch (error) {
      throw error
    }
  }

  public async getAllStudentById(id: string): Promise<any[]> {
    try {
      const res = await this.api.get(`/${id}/student`)
      await checkError(res)

      return res.json()
    } catch (error) {
      throw error
    }
  }

  public async updateById(data: Class): Promise<void> {
    try {
      const res = await this.api.patch(`/${data.id}`, data)
      await checkError(res)
    } catch (error) {
      throw error
    }
  }

  public async deleteById(id: string): Promise<void> {
    try {
      const res = await this.api.delete(`/${id}`)
      await checkError(res)
    } catch (error) {
      throw error
    }
  }
}