import { Injectable } from '@nestjs/common'
import { Student } from 'generated/prisma'
import { NotFoundError } from 'src/common/errors/not-found-error'
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

  public async updateById(student: Student): Promise<void> {
    try {
      await this.getById(student.id)

      await this.prisma.student.update({
        where: {
          id: student.id,
        },
        data: student
      })
    } catch (error) {
      throw error
    }
  }

  public async deleteById(id: string): Promise<Student> {
    try {
      const student = await this.getById(id)
      if (!student) throw new NotFoundError('Student not found')

      await this.prisma.studentClass.deleteMany({
        where: {
          studentId: id
        }
      })

      await this.prisma.student.delete({
        where: { id }
      })

      return student
    } catch (error) {
      throw error
    }
  }
}
