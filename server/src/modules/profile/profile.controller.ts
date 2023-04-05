import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Request() req) {
    return this.profileService.findOne(req.user.id)
  }
}
