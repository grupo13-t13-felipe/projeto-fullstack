import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Request as req } from 'express';
import { AnnoucementsService } from './annoucements.service';
import { CreateAnnoucementDto } from './dto/create-annoucement.dto';
import { UpdateAnnoucementDto } from './dto/update-annoucement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateGalleryImagesArrayDto } from '../gallery_images/dto/create-gallery_image.dto';
import { AnnoucementExistsGuard } from './guards/annoucement-exists.guard';
import { AnnoucementFiltersDto } from './dto/annoucements-filters.dto';
import { IsAnnoucementOwnerGuard } from './guards/is-annoucement-owner.guard';

interface AuthRequest extends req {
  user: User;
}
@Controller('annoucements')
export class AnnoucementsController {
  constructor(private readonly annoucementsService: AnnoucementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createGalleryImagesArrayDto: CreateGalleryImagesArrayDto,
    @Body() createAnnoucementDto: CreateAnnoucementDto,
    @Request() request: AuthRequest,
  ) {
    return this.annoucementsService.create(
      createAnnoucementDto,
      createGalleryImagesArrayDto,
      request.user,
    );
  }

  @Get('filters')
  getAllAnnoucementFilterTypes() {
    return this.annoucementsService.getAllAnnoucementFilterTypes();
  }

  @Get()
  findAll(
    @Query() query: AnnoucementFiltersDto,
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Query('min_price') minPrice: string,
  ) {
    return this.annoucementsService.findAll(query, +limit, +page);
  }

  @Get(':annoucement_id')
  @UseGuards(AnnoucementExistsGuard)
  findOne(@Param('annoucement_id') annoucement_id: string) {
    return this.annoucementsService.findOne(annoucement_id);
  }

  @Patch(':annoucement_id')
  @UseGuards(JwtAuthGuard, AnnoucementExistsGuard, IsAnnoucementOwnerGuard)
  update(
    @Param('annoucement_id') annoucement_id: string,
    @Body() updateAnnoucementDto: UpdateAnnoucementDto,
  ) {
    return this.annoucementsService.update(
      annoucement_id,
      updateAnnoucementDto,
    );
  }

  @Delete(':annoucement_id')
  @UseGuards(JwtAuthGuard, AnnoucementExistsGuard, IsAnnoucementOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('annoucement_id') annoucement_id: string) {
    return this.annoucementsService.remove(annoucement_id);
  }
}
