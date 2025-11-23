import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common'
import type { Response } from 'express'
import type { Student } from 'generated/prisma'
import { errorMessageParser } from 'src/common/utils/error-message-parser'
import { StudentService } from './student.service'

@Controller('/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post()
  public async create(@Res() res: Response, @Body() student: Omit<Student, 'id'>) {
    try {
      await this.studentService.create(student)

      return res.status(200).send()
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Get()
  public async getAll(@Res() res: Response) {
    try {
      const students = await this.studentService.getAll()

      return res.json(students)
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Get('/:id')
  public async getById(@Res() res: Response, @Param('id') id: string) {
    try {
      const student = await this.studentService.getById(id)

      return res.json(student)
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Patch('/:id')
  public async updateById(@Res() res: Response, @Param('id') id: string, @Body() student: Omit<Student, 'id'>) {
    try {
      await this.studentService.updateById({ ...student, id })

      return res.status(200).send()
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Delete('/:id')
  public async deleteById(@Res() res: Response, @Param('id') id: string) {
    try {
      await this.studentService.deleteById(id)

      return res.status(200).send()
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }
}
