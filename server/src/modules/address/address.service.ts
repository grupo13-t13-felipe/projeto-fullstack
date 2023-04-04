import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './repositories/address.repository';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepository) {}
  findAll() {
    return this.addressRepository.findAll();
  }

  findOne(id: string) {
    const findAddress = this.addressRepository.findOne(id);
    if(!findAddress) {
      throw new NotFoundException("address not found");
    }
    return findAddress;
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    const findAddress = this.addressRepository.findOne(id);
    if(!findAddress) {
      throw new NotFoundException("address not found");
    }
    return this.addressRepository.update(id, updateAddressDto);
  }
}
