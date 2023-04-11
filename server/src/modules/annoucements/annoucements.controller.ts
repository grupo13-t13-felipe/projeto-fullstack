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
} from '@nestjs/common';
import { AnnoucementsService } from './annoucements.service';
import { CreateAnnoucementDto } from './dto/create-annoucement.dto';
import { UpdateAnnoucementDto } from './dto/update-annoucement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateGalleryImageDto } from '../gallery_images/dto/create-gallery_image.dto';
import { AnnoucementExistsGuard } from './guards/annoucement-exists.guard';
import { UpdateGalleryImageDto } from '../gallery_images/dto/update-gallery_image.dto';

interface AuthRequest extends Request {
  user: User;
}
@Controller('annoucements')
export class AnnoucementsController {
  constructor(private readonly annoucementsService: AnnoucementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createGalleryImageDto: CreateGalleryImageDto,
    @Body() createAnnoucementDto: CreateAnnoucementDto,
    @Request() request: AuthRequest,
  ) {
    return this.annoucementsService.create(
      createAnnoucementDto,
      createGalleryImageDto,
      request.user,
    );
  }

  @Get()
  findAll() {
    return this.annoucementsService.findAll();
  }

  @Get(':annoucement_id')
  @UseGuards(JwtAuthGuard, AnnoucementExistsGuard)
  findOne(@Param('annoucement_id') annoucement_id: string) {
    return this.annoucementsService.findOne(annoucement_id);
  }

  @Patch(':annoucement_id')
  @UseGuards(JwtAuthGuard, AnnoucementExistsGuard)
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
  @UseGuards(JwtAuthGuard, AnnoucementExistsGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('annoucement_id') annoucement_id: string) {
    return this.annoucementsService.remove(annoucement_id);
  }
}
