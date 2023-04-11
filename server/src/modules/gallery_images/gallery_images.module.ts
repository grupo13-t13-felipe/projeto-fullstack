import { Module } from '@nestjs/common';
import { GalleryImagesService } from './gallery_images.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [GalleryImagesService, PrismaService],
  exports: [GalleryImagesService],
})
export class GalleryImagesModule {}
