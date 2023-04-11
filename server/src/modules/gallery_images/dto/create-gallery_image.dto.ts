import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateGalleryImageDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GalleryImage)
  gallery_images: GalleryImage[];
}

class GalleryImage {
  @IsString()
  url: string;
  annoucement_id?: string;
}
