import { Module } from '@nestjs/common';
import { AnnoucementsService } from './annoucements.service';
import { AnnoucementsController } from './annoucements.controller';

@Module({
  controllers: [AnnoucementsController],
  providers: [AnnoucementsService]
})
export class AnnoucementsModule {}
