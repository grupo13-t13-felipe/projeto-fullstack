import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class AnnoucementFiltersDto {
  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsDateString()
  year?: string;

  @IsOptional()
  @IsString()
  fuel?: string;

  @IsOptional()
  @IsString()
  km?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  min_price?: string;

  @IsOptional()
  @IsString()
  max_price?: string;

  @IsOptional()
  @IsString()
  min_km?: string;

  @IsOptional()
  @IsString()
  max_km?: string;

  @IsOptional()
  @IsUUID()
  owner_id?: string;
}
