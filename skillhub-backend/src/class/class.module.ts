import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import { ClassController } from './class.controller'
import { ClassService } from './class.service'

@Module({
  imports: [CommonModule],
  providers: [ClassService],
  controllers: [ClassController]
})

export class ClassModule { }
