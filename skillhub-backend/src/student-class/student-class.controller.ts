import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common'
import type { Response } from 'express'
import { StudentClass } from 'generated/prisma'
import { errorMessageParser } from 'src/common/utils/error-message-parser'
import { StudentClassService } from './student-class.service'

@Controller('/student-class')
export class StudentClassController {
  constructor(private readonly studentClassService: StudentClassService) { }

  @Post()
  public async create(@Res() res: Response, @Body() student: Omit<StudentClass, 'id'>) {
    try {
      await this.studentClassService.create(student)

      return res.status(200).send()
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Get('/student/:id')
  public async getAllClassesByStudentId(@Res() res: Response, @Param('id') studentId: string) {
    try {
      const classes = await this.studentClassService.getAllClassesByStudentId(studentId)

      return res.json(classes)
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Get('/class/:id')
  public async getAllStudentsByClassId(@Res() res: Response, @Param('id') classId: string) {
    try {
      const students = await this.studentClassService.getAllStudentsByClassId(classId)

      return res.json(students)
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Delete('/:id')
  public async deleteById(@Res() res: Response, @Param('id') id: string) {
    try {
      await this.studentClassService.deleteById(id)

      return res.status(200).send()
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }
}
