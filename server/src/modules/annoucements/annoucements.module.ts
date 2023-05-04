import { Module } from '@nestjs/common';
import { AnnoucementsService } from './annoucements.service';
import { AnnoucementsController } from './annoucements.controller';
import { PrismaClient } from '@prisma/client';
import { GalleryImagesService } from '../gallery_images/gallery_images.service';

@Module({
  controllers: [AnnoucementsController],
  providers: [AnnoucementsService, PrismaClient, GalleryImagesService],
})
export class AnnoucementsModule {}
