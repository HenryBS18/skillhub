import { Module } from '@nestjs/common'
import { CommonModule } from './common/common.module'
import { StudentModule } from './student/student.module'

@Module({
  imports: [CommonModule, StudentModule],
  controllers: [],
  providers: [],
})

export class AppModule { }
