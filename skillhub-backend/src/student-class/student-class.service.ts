import { Injectable } from '@nestjs/common'
import { StudentClass } from 'generated/prisma'
import { NotFoundError } from 'src/common/errors/not-found-error'
import { PrismaService } from 'src/common/prisma.service'

@Injectable()
export class StudentClassService {
  constructor(private readonly prisma: PrismaService) { }

  public async create(student: Omit<StudentClass, 'id'>): Promise<void> {
    try {
      await this.prisma.studentClass.create({ data: student })
    } catch (error) {
      throw error
    }
  }

  public async getAllClassesByStudentId(studentId: string): Promise<any[]> {
    try {
      return await this.prisma.studentClass.findMany({
        where: {
          studentId
        },
        select: {
          id: true,
          class: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      })
    } catch (error) {
      throw error
    }
  }

  public async getAllStudentsByClassId(classId: string): Promise<any[]> {
    try {
      return await this.prisma.studentClass.findMany({
        where: {
          classId
        },
        select: {
          id: true,
          student: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      })
    } catch (error) {
      throw error
    }
  }

  public async deleteById(id: string): Promise<void> {
    try {
      const studentClass = await this.prisma.studentClass.findFirst({
        where: {
          id
        }
      })
      if (!studentClass) throw new NotFoundError('Student class not found')

      await this.prisma.studentClass.delete({
        where: {
          id
        }
      })
    } catch (error) {
      throw error
    }
  }
}
