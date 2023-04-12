import { Module } from '@nestjs/common';
import { AnnoucementsService } from './annoucements.service';
import { AnnoucementsController } from './annoucements.controller';
import { PrismaService } from 'src/database/prisma.service';
import { GalleryImagesService } from '../gallery_images/gallery_images.service';

@Module({
  controllers: [AnnoucementsController],
  providers: [AnnoucementsService, PrismaService, GalleryImagesService],
})
export class AnnoucementsModule {}
