import { Injectable } from '@nestjs/common';
import { CreateGalleryImageDto } from './dto/create-gallery_image.dto';
import { UpdateGalleryImageDto } from './dto/update-gallery_image.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Annoucement } from '../annoucements/entities/annoucement.entity';

@Injectable()
export class GalleryImagesService {
  constructor(private prisma: PrismaService) {}
  async createMany(
    createGalleryImageDto: CreateGalleryImageDto,
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

  async findAll() {
    return await this.prisma.galleryImage.findMany();
  }

  async updateMany(
    annoucement_id: string,
    updateGalleryImageDto: UpdateGalleryImageDto,
  ) {
    // const annoucement = await this.prisma.annoucement.findFirst({
    //   where: { id: annoucement_id },
    //   include: { gallery_images: true },
    // });
    // updateGalleryImageDto.gallery_images.forEach((galleryImage) => {});
    // const galleryImages = await this.prisma.galleryImage.updateMany({
    //   where: { annoucement_id },
    //   data: { ...updateGalleryImageDto.gallery_images },
    // });
    // console.log(galleryImages);
    // return galleryImages;
  }

  remove(id: number) {
    return `This action removes a #${id} galleryImage`;
  }
}
