import { PartialType } from '@nestjs/mapped-types';
import { CreateGalleryImageDto } from './create-gallery_image.dto';

export class UpdateGalleryImageDto extends PartialType(CreateGalleryImageDto) {}
