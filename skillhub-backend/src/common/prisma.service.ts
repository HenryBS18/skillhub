
import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    })

    super({ adapter })
  }

  async onModuleInit() {
    await this.class.createMany({
      skipDuplicates: true,
      data: [
        {
          id: '5wpPSYIeyowA0pHMgOTf7',
          name: 'Desain Grafis',
          description: 'Kelas ini akan membimbing Anda dari nol untuk mengubah ide kreatif menjadi desain visual profesional, mulai dari membuat logo dasar hingga menyusun tata letak media cetak dan digital.',
          instructor: 'Budi',
        },
        {
          id: 'c0GW5wo9_TNoolX4s709L',
          name: 'Pemrograman Dasar',
          description: 'Kelas Pemrograman Dasar adalah kursus pengantar yang mengajarkan logika, algoritma, dan sintaks dasar dari bahasa pemrograman untuk membangun fondasi yang kuat dalam rekayasa perangkat lunak.',
          instructor: 'Asep',
        },
        {
          id: 'dff-_ptphH7VFr0z4QODg',
          name: 'Editing Video',
          description: 'Kelas ini akan membimbing Anda menguasai teknik dan perangkat lunak editing standar industri untuk mengubah rekaman mentah menjadi narasi visual yang sinematik dan menarik.',
          instructor: 'Joko',
        },
        {
          id: 'mRZrqb0ZE1l15zCWhzJuw',
          name: 'Public Speaking',
          description: 'Kelas ini mengajarkan teknik komunikasi yang efektif, membangun rasa percaya diri, dan keterampilan untuk menyampaikan ide dengan jelas dan meyakinkan di hadapan audiens.',
          instructor: 'Wawans',
        },
      ]
    })

    await this.student.createMany({
      skipDuplicates: true,
      data: [
        {
          id: 'OZrP924wMQCWuwTF0kaeU',
          name: 'Henry',
          nim: '123',
          email: 'henry@mail.com',
        },
        {
          id: '4x3hEh8RV_lCK-DK4x-tR',
          name: 'Hendra',
          nim: '456',
          email: 'hendra@mail.com',
        },
        {
          id: '1lByGS2FwA-Z6IFVCKbGY',
          name: 'Dewa',
          nim: '789',
          email: 'dewa@mail.com',
        },
      ]
    })
  }
}
