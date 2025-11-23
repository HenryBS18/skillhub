import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common'
import type { Response } from 'express'
import { Class } from 'generated/prisma'
import { errorMessageParser } from 'src/common/utils/error-message-parser'
import { ClassService } from './class.service'

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) { }

  @Post()
  public async create(@Res() res: Response, @Body() classData: Omit<Class, 'id'>) {
    try {
      await this.classService.create(classData)

      return res.status(200).send()
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Get()
  public async getAll(@Res() res: Response) {
    try {
      const classesData = await this.classService.getAll()

      return res.json(classesData)
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Get('/:id')
  public async getById(@Res() res: Response, @Param('id') id: string) {
    try {
      const classData = await this.classService.getById(id)

      return res.json(classData)
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Patch('/:id')
  public async updateById(@Res() res: Response, @Param('id') id: string, @Body() classData: Omit<Class, 'id'>) {
    try {
      await this.classService.updateById({ ...classData, id })

      return res.status(200).send()
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Delete('/:id')
  public async deleteById(@Res() res: Response, @Param('id') id: string) {
    try {
      await this.classService.deleteById(id)

      return res.status(200).send()
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }
}
