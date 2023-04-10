import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AnnoucementsModule } from './modules/annoucements/annoucements.module';

@Module({
  imports: [UsersModule, AddressModule, AuthModule, ProfileModule, AnnoucementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
