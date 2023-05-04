/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaClient } from '@prisma/client';
import { UsersPrismaRepository } from './repositories/prisma/users.prisma.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/utils/mail.service';
import "dotenv/config"

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      },
      defaults: {
        from: "biblioteka.kenzie@gmail.com"
      }
    })
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaClient,
    UsersPrismaRepository,
    MailService,
  ],
  exports: [UsersService]
})
export class UsersModule { }
