import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersPrismaRepository } from '../users/repositories/prisma/users.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService, UsersPrismaRepository, JwtStrategy]
})
export class ProfileModule {}
