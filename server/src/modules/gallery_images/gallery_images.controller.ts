import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GalleryImagesService } from './gallery_images.service';
import {
  CreateGalleryImagesArrayDto,
  GalleryImageDto,
} from './dto/create-gallery_image.dto';
import { AnnoucementExistsGuard } from '../annoucements/guards/annoucement-exists.guard';
import { ImageExistsGuard } from './guards/image-exists.guard';
import { UpdateGalleryImageDto } from './dto/update-gallery_image.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class GalleryImagesController {
  constructor(private readonly galleryImagesService: GalleryImagesService) {}

  @Get('annoucements/:annoucement_id/gallery-images')
  @UseGuards(AnnoucementExistsGuard)
  findAll(@Param('annoucement_id') annoucement_id: string) {
    return this.galleryImagesService.findAllFromAnnoucement(annoucement_id);
  }

  @Post('annoucements/:annoucement_id/gallery-images')
  @UseGuards(JwtAuthGuard, AnnoucementExistsGuard)
  create(
    @Param('annoucement_id') annoucement_id: string,
    @Body() galleryImageDto: GalleryImageDto,
  ) {
    return this.galleryImagesService.create(annoucement_id, galleryImageDto);
  }

  @Patch('gallery-images/:image_id')
  @UseGuards(JwtAuthGuard, ImageExistsGuard)
  update(
    @Param('image_id') image_id: string,
    @Body() updateGalleryImageDto: UpdateGalleryImageDto,
  ) {
    return this.galleryImagesService.update(image_id, updateGalleryImageDto);
  }

  @Delete('gallery-images/:image_id')
  @UseGuards(JwtAuthGuard, ImageExistsGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('image_id') image_id: string) {
    return this.galleryImagesService.remove(image_id);
  }
}
