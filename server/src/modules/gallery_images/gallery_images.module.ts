import { Module } from '@nestjs/common';
import { GalleryImagesService } from './gallery_images.service';
import { PrismaService } from 'src/database/prisma.service';
import { GalleryImagesController } from './gallery_images.controller';

@Module({
  providers: [GalleryImagesService, PrismaService],
  exports: [GalleryImagesService],
  controllers: [GalleryImagesController],
})
export class GalleryImagesModule {}
