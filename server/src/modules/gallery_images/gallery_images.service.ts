import { Injectable } from '@nestjs/common';
import {
  CreateGalleryImagesArrayDto,
  GalleryImageDto,
} from './dto/create-gallery_image.dto';
import { PrismaClient } from '@prisma/client';
import { Annoucement } from '../annoucements/entities/annoucement.entity';
import { UpdateGalleryImageDto } from './dto/update-gallery_image.dto';

@Injectable()
export class GalleryImagesService {
  constructor(private prisma: PrismaClient) {}

  async createMany(
    createGalleryImageDto: CreateGalleryImagesArrayDto,
    annoucement: Annoucement,
  ) {
    const galleryImageData = createGalleryImageDto.gallery_images.map(
      (galleryImage) => {
        return {
          ...galleryImage,
          annoucement_id: annoucement.id,
        };
      },
    );
    await this.prisma.galleryImage.createMany({
      data: galleryImageData,
    });
    return galleryImageData;
  }

  async create(annoucement_id: string, galleryImageDto: GalleryImageDto) {
    const image = await this.prisma.galleryImage.create({
      data: {
        ...galleryImageDto,
        annoucement_id,
      },
    });
    return image;
  }

  async findAllFromAnnoucement(annoucement_id: string) {
    const images = await this.prisma.galleryImage.findMany({
      where: { annoucement_id },
    });
    return images;
  }

  async update(image_id: string, updateGalleryImageDto: UpdateGalleryImageDto) {
    const image = await this.prisma.galleryImage.update({
      where: { id: image_id },
      data: updateGalleryImageDto,
    });
    return image;
  }

  async remove(image_id: string) {
    await this.prisma.galleryImage.delete({ where: { id: image_id } });
  }
}
