
import { Injectable } from '@nestjs/common'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
import { env } from '../env'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASS,
    })

    super({ adapter })
  }
}
