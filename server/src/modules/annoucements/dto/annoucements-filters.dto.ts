import { IsDateString, IsOptional, IsString } from 'class-validator';

export class AnnoucementFiltersDto {
  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsDateString()
  year: string;

  @IsOptional()
  @IsString()
  fuel: string;

  @IsOptional()
  @IsString()
  km: string;

  @IsOptional()
  @IsString()
  color: string;
}
