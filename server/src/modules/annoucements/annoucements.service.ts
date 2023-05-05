import { Injectable, HttpException } from '@nestjs/common';
import { CreateAnnoucementDto } from './dto/create-annoucement.dto';
import { UpdateAnnoucementDto } from './dto/update-annoucement.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '../users/entities/user.entity';
import { CreateGalleryImagesArrayDto } from '../gallery_images/dto/create-gallery_image.dto';
import { GalleryImagesService } from '../gallery_images/gallery_images.service';
import { AnnoucementFiltersDto } from './dto/annoucements-filters.dto';
import { Annoucement, GalleryImage } from '@prisma/client';
import { getPaginatedResponse } from 'src/utils/getPaginatedResponse.utils';

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

  getAnnoucementFilters(filterQueries: AnnoucementFiltersDto) {
    const filters: {
      where: {
        brand?: string;
        model?: string;
        color?: string;
        year?: string;
        fuel?: string;
        owner_id?: string;
        price?: { lte: string; gte: string };
        km?: { lte: string; gte: string };
      };
    } = filterQueries
      ? {
          where: {
            owner_id: filterQueries?.owner_id,
            brand: filterQueries?.brand,
            model: filterQueries?.model,
            color: filterQueries?.color,
            year: filterQueries?.year,
            fuel: filterQueries?.fuel,
          },
        }
      : undefined;
    if (filterQueries.min_price || filterQueries.max_price) {
      filters.where = {
        ...filters.where,
        price: {
          lte: filterQueries?.max_price,
          gte: filterQueries?.min_price,
        },
      };
    }
    if (filterQueries.min_km || filterQueries.max_km) {
      filters.where = {
        ...filters.where,
        km: {
          lte: filterQueries?.max_km,
          gte: filterQueries?.min_km,
        },
      };
    }
    return filters;
  }

  async getAllAnnoucementFilterTypes() {
    const allAnnoucements = await this.prisma.annoucement.findMany();

    const brand = allAnnoucements
      .map((annoucement) => annoucement.brand)
      .filter((value, index, self) => self.indexOf(value) === index);
    const model = allAnnoucements
      .map((annoucement) => annoucement.model)
      .filter((value, index, self) => self.indexOf(value) === index);
    const color = allAnnoucements
      .map((annoucement) => annoucement.color)
      .filter((value, index, self) => self.indexOf(value) === index);
    const year = allAnnoucements
      .map((annoucement) => annoucement.year)
      .filter((value, index, self) => self.indexOf(value) === index);
    const fuel = allAnnoucements
      .map((annoucement) => annoucement.fuel)
      .filter((value, index, self) => self.indexOf(value) === index);

    return {
      brand,
      model,
      color,
      year,
      fuel,
    };
  }

  async findAll(
    filterQueries: AnnoucementFiltersDto,
    limit: number,
    page: number,
  ) {
    const filters = this.getAnnoucementFilters(filterQueries);
    const itemsCount = await this.prisma.annoucement.count({
      ...filters,
    });
    const response = await getPaginatedResponse({
      limit,
      page,
      itemsCount,
      callback: async (take: number, skip: number) => {
        return await this.prisma.annoucement.findMany({
          include: {
            gallery_images: true,
            owner: { select: { id: true, name: true } },
          },
          orderBy: { created_at: 'desc' },

          ...filters,
          take,
          skip,
        });
      },
    });
    return response;
  }

  async findOne(id: string) {
    return await this.prisma.annoucement.findFirst({
      where: { id },
      include: {
        gallery_images: true,
        owner: { select: { id: true, name: true, description: true } },
        comments: {
          select: {
            id: true,
            content: true,
            created_at: true,
            updated_at: true,
            owner: { select: { id: true, name: true, email: true } },
          },
        },
      },
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
