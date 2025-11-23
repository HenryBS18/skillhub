import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common'
import type { Response } from 'express'
import { errorMessageParser } from 'src/common/utils/error-message-parser'
import { StudentClassService } from './student-class.service'

@Controller()
export class StudentClassController {
  constructor(private readonly studentClassService: StudentClassService) { }

  @Post('/student/:studentId/class')
  public async create(@Res() res: Response, @Param('studentId') studentId: string, @Body() { classId }: { classId: string }) {
    try {
      await this.studentClassService.create({ studentId, classId })

      return res.status(200).send()
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Get('/student/:id/class')
  public async getAllClassesByStudentId(@Res() res: Response, @Param('id') studentId: string) {
    try {
      const classes = await this.studentClassService.getAllClassesByStudentId(studentId)

      return res.json(classes)
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Get('/class/:id/student')
  public async getAllStudentsByClassId(@Res() res: Response, @Param('id') classId: string) {
    try {
      const students = await this.studentClassService.getAllStudentsByClassId(classId)

      return res.json(students)
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }

  @Delete('/student-class/:id')
  public async deleteById(@Res() res: Response, @Param('id') id: string) {
    try {
      await this.studentClassService.deleteById(id)

      return res.status(200).send()
    } catch (error) {
      return errorMessageParser(res, error)
    }
  }
}
