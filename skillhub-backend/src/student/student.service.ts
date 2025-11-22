import { Injectable } from '@nestjs/common'
import { Student } from 'generated/prisma/client'
import { NotFoundError } from 'src/errors/notFoundError'
import { PrismaService } from './../common/prisma.service'

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) { }

  public async create(student: Omit<Student, 'id'>): Promise<void> {
    try {
      await this.prisma.student.create({ data: student })
    } catch (error) {
      throw error
    }
  }

  public async getAll(): Promise<Student[]> {
    try {
      return await this.prisma.student.findMany()
    } catch (error) {
      throw error
    }
  }

  public async getById(id: string): Promise<Student> {
    try {
      const student = await this.prisma.student.findFirst({
        where: {
          id
        }
      })
      if (!student) throw new NotFoundError('Student not found')

      return student
    } catch (error) {
      throw error
    }
  }

  public async deleteById(id: string): Promise<Student> {
    try {
      const student = await this.getById(id)
      if (!student) throw new NotFoundError('Student not found')

      await this.prisma.student.delete({
        where: { id }
      })

      return student
    } catch (error) {
      throw error
    }
  }
}
