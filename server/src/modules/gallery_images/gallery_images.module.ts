import { Module } from '@nestjs/common';
import { GalleryImagesService } from './gallery_images.service';
import { GalleryImagesController } from './gallery_images.controller';

@Module({
  controllers: [GalleryImagesController],
  providers: [GalleryImagesService]
})
export class GalleryImagesModule {}
