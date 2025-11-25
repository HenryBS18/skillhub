import { Injectable } from '@nestjs/common'
import { Class } from 'generated/prisma/client'
import { NotFoundError } from 'src/common/errors/not-found-error'
import { PrismaService } from 'src/common/prisma.service'

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) { }

  public async create(classData: Omit<Class, 'id'>): Promise<void> {
    try {
      await this.prisma.class.create({ data: classData })
    } catch (error) {
      throw error
    }
  }

  public async getAll(): Promise<Class[]> {
    try {
      return await this.prisma.class.findMany()
    } catch (error) {
      throw error
    }
  }

  public async getById(id: string): Promise<Class> {
    try {
      const classData = await this.prisma.class.findFirst({
        where: { id }
      })
      if (!classData) throw new NotFoundError('Class not found')

      return classData
    } catch (error) {
      throw error
    }
  }

  public async updateById(classData: Class): Promise<void> {
    try {
      await this.getById(classData.id)

      await this.prisma.class.update({
        where: {
          id: classData.id,
        },
        data: classData
      })
    } catch (error) {
      throw error
    }
  }

  public async deleteById(id: string) {
    try {
      await this.getById(id)

      await this.prisma.class.delete({
        where: { id }
      })
    } catch (error) {
      throw error
    }
  }
}
