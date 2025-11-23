import { Module } from '@nestjs/common'
import { ClassModule } from './class/class.module'
import { CommonModule } from './common/common.module'
import { StudentModule } from './student/student.module'

@Module({
  imports: [CommonModule, StudentModule, ClassModule],
  controllers: [],
  providers: [],
})

export class AppModule { }
