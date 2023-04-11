import { Injectable } from '@nestjs/common';
import { CreateGalleryImageDto } from './dto/create-gallery_image.dto';
import { UpdateGalleryImageDto } from './dto/update-gallery_image.dto';

@Injectable()
export class GalleryImagesService {
  create(createGalleryImageDto: CreateGalleryImageDto) {
    return 'This action adds a new galleryImage';
  }

  findAll() {
    return `This action returns all galleryImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} galleryImage`;
  }

  update(id: number, updateGalleryImageDto: UpdateGalleryImageDto) {
    return `This action updates a #${id} galleryImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} galleryImage`;
  }
}
