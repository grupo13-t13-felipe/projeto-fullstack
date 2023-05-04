import { Module } from '@nestjs/common';
import { GalleryImagesService } from './gallery_images.service';
import { PrismaClient } from '@prisma/client';
import { GalleryImagesController } from './gallery_images.controller';

@Module({
  providers: [GalleryImagesService, PrismaClient],
  exports: [GalleryImagesService],
  controllers: [GalleryImagesController],
})
export class GalleryImagesModule {}
