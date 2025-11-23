import type { AssignClass, CreateStudent, Student } from "~/types"
import { Api, checkError } from "~/utils"


export class StudentService {
  private api: Api

  constructor() {
    this.api = new Api('/student')
  }

  public async create(student: CreateStudent): Promise<void> {
    try {
      const res = await this.api.post('', student)
      await checkError(res)
    } catch (error) {
      throw error
    }
  }

  public async getAll(): Promise<Student[]> {
    try {
      const res = await this.api.get('')
      await checkError(res)

      return await res.json()
    } catch (error) {
      throw error
    }
  }

  public async getById(id: string): Promise<Student> {
    try {
      const res = await this.api.get(`/${id}`)
      await checkError(res)

      return res.json()
    } catch (error) {
      throw error
    }
  }

  public async getAllClassById(id: string): Promise<any[]> {
    try {
      const res = await this.api.get(`/${id}/class`)
      await checkError(res)

      return res.json()
    } catch (error) {
      throw error
    }
  }

  public async updateById(student: Student): Promise<void> {
    try {
      const res = await this.api.patch(`/${student.id}`, student)
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

  public async assignClass({ studentId, classId }: AssignClass): Promise<void> {
    try {
      const res = await this.api.post(`/${studentId}/class`, classId)
      await checkError(res)
    } catch (error) {
      throw error
    }
  }

  public async removeFromClass(id: string): Promise<void> {
    try {
      const api = new Api()
      const res = await api.delete(`/student-class/${id}`)
      await checkError(res)
    } catch (error) {
      throw error
    }
  }
}