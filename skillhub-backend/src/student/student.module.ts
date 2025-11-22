import { Module } from '@nestjs/common'
import { CommonModule } from './../common/common.module'
import { StudentController } from './student.controller'
import { StudentService } from './student.service'

@Module({
  imports: [CommonModule],
  providers: [StudentService],
  controllers: [StudentController],
})

export class StudentModule { }
