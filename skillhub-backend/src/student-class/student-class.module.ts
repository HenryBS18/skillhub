import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import { StudentClassController } from './student-class.controller'
import { StudentClassService } from './student-class.service'

@Module({
  imports: [CommonModule],
  providers: [StudentClassService],
  controllers: [StudentClassController]
})
export class StudentClassModule { }
