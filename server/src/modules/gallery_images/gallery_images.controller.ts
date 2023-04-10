import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GalleryImagesService } from './gallery_images.service';
import { CreateGalleryImageDto } from './dto/create-gallery_image.dto';
import { UpdateGalleryImageDto } from './dto/update-gallery_image.dto';

@Controller('gallery-images')
export class GalleryImagesController {
  constructor(private readonly galleryImagesService: GalleryImagesService) {}

  @Post()
  create(@Body() createGalleryImageDto: CreateGalleryImageDto) {
    return this.galleryImagesService.create(createGalleryImageDto);
  }

  @Get()
  findAll() {
    return this.galleryImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalleryImageDto: UpdateGalleryImageDto) {
    return this.galleryImagesService.update(+id, updateGalleryImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryImagesService.remove(+id);
  }
}
