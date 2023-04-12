import { Injectable } from '@nestjs/common';
import { CreateAnnoucementDto } from './dto/create-annoucement.dto';
import { UpdateAnnoucementDto } from './dto/update-annoucement.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '../users/entities/user.entity';
import { CreateGalleryImagesArrayDto } from '../gallery_images/dto/create-gallery_image.dto';
import { GalleryImagesService } from '../gallery_images/gallery_images.service';

@Injectable()
export class AnnoucementsService {
  constructor(
    private prisma: PrismaService,
    private galleryImageService: GalleryImagesService,
  ) {}
  async create(
    createAnnoucementDto: CreateAnnoucementDto,
    createGalleryImagesArrayDto: CreateGalleryImagesArrayDto,
    user: User,
  ) {
    const annoucement = await this.prisma.annoucement.create({
      data: {
        ...createAnnoucementDto,
        owner: {
          connect: { id: user.id },
        },
      },
    });
    if (createGalleryImagesArrayDto.gallery_images) {
      this.galleryImageService.createMany(
        createGalleryImagesArrayDto,
        annoucement,
      );
    }
    return this.prisma.annoucement.findFirst({
      where: { id: annoucement.id },
      include: { gallery_images: true },
    });
  }

  async findAll() {
    return await this.prisma.annoucement.findMany({
      include: { gallery_images: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.annoucement.findFirst({
      where: { id },
      include: { gallery_images: true },
    });
  }

  async update(
    annoucement_id: string,
    updateAnnoucementDto: UpdateAnnoucementDto,
  ) {
    await this.prisma.annoucement.update({
      data: { ...updateAnnoucementDto },
      where: { id: annoucement_id },
    });
    return this.findOne(annoucement_id);
  }

  async remove(id: string) {
    const annoucement = await this.prisma.annoucement.delete({
      where: { id },
    });
    return annoucement;
  }
}
