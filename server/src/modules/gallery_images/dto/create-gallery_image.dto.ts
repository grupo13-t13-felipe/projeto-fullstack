import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateGalleryImagesArrayDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GalleryImageDto)
  gallery_images: GalleryImageDto[];
}

export class GalleryImageDto {
  @IsString()
  url: string;
}
