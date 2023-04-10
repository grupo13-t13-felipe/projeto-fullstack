import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(127)
  name: string;

  @IsEmail()
  @MaxLength(127)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(127)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  is_seller: boolean;

  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => new Date(value))
  birth_date: Date;
}
