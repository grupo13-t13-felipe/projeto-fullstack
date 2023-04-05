import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddressOwnerGuard } from './guards/address-owner.guard';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AddressOwnerGuard)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }
}
