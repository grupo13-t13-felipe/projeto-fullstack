import { IsString, IsNotEmpty, MaxLength, Length } from "class-validator";

export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    @Length(8)
    cep: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    state: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    city: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    street: string;

    @IsString()
    @MaxLength(8)
    number: string;

    @IsString()
    @IsNotEmpty()
    complement: string;
}
