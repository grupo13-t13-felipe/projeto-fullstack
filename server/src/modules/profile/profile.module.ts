import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, JwtStrategy]
})
export class ProfileModule {}
