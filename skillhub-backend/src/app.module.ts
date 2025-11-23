import { Module } from '@nestjs/common'
import { ClassModule } from './class/class.module'
import { CommonModule } from './common/common.module'
import { StudentClassModule } from './student-class/student-class.module'
import { StudentModule } from './student/student.module'

@Module({
  imports: [CommonModule, StudentModule, ClassModule, StudentClassModule],
  controllers: [],
  providers: [],
})

export class AppModule { }
