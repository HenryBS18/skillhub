import { Injectable } from '@nestjs/common'
import { StudentClass } from 'generated/prisma'
import { NotFoundError } from 'src/common/errors/not-found-error'
import { PrismaService } from 'src/common/prisma.service'

@Injectable()
export class StudentClassService {
  constructor(private readonly prisma: PrismaService) { }

  public async create(data: Omit<StudentClass, 'id'>): Promise<void> {
    try {
      const alreadyJoin = await this.prisma.studentClass.findFirst({
        where: {
          classId: data.classId,
          AND: {
            studentId: data.studentId,
          }
        }
      })
      if (alreadyJoin) throw new Error('Already join class')

      await this.prisma.studentClass.create({ data })
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

  public async getAllClassNotAssignedByStudentId(studentId: string): Promise<any[]> {
    try {
      const assignedClassIds = await this.prisma.studentClass.findMany({
        where: {
          studentId
        },
        select: {
          classId: true
        }
      }).then(rows => rows.map(r => r.classId))

      const classes = await this.prisma.class.findMany({
        select: {
          id: true,
          name: true,
        }
      })

      return classes.filter(c => !assignedClassIds.includes(c.id))
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
