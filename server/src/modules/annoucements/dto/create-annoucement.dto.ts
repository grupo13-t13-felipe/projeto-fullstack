import { IsDateString, IsDecimal, IsString, IsUrl } from 'class-validator';

export class CreateAnnoucementDto {
  @IsString()
  model: string;

  @IsString()
  brand: string;

  @IsDateString()
  year: string;

  @IsString()
  fuel: string;

  @IsString()
  km: string;

  @IsString()
  color: string;

  @IsDecimal()
  fip_price: string;

  @IsDecimal()
  price: string;

  @IsString()
  description: string;

  @IsUrl()
  cover_image: string;
}
