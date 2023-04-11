import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnoucementDto } from './dto/create-annoucement.dto';
import { UpdateAnnoucementDto } from './dto/update-annoucement.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '../users/entities/user.entity';
import { CreateGalleryImageDto } from '../gallery_images/dto/create-gallery_image.dto';
import { GalleryImagesService } from '../gallery_images/gallery_images.service';
import { UpdateGalleryImageDto } from '../gallery_images/dto/update-gallery_image.dto';

@Injectable()
export class AnnoucementsService {
  constructor(
    private prisma: PrismaService,
    private galleryImageService: GalleryImagesService,
  ) {}
  async create(
    createAnnoucementDto: CreateAnnoucementDto,
    createGalleryImageDto: CreateGalleryImageDto,
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
    this.galleryImageService.createMany(createGalleryImageDto, annoucement);
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
    // await this.galleryImageService.updateMany(
    //   annoucement_id,
    //   updateGalleryImageDto,
    // );
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
  }
}
