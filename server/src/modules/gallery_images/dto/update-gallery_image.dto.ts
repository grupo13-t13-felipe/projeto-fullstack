import { PartialType } from '@nestjs/mapped-types';
import { GalleryImageDto } from './create-gallery_image.dto';

export class UpdateGalleryImageDto extends PartialType(GalleryImageDto) {}
