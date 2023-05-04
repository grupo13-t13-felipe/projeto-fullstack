import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaClient } from '@prisma/client';
import { AddressRepository } from './repositories/address.repository';
import { AddressPrismaRepository } from './repositories/prisma/address.prisma.repository';

@Module({
  controllers: [AddressController],
  providers: [
    AddressService,
    PrismaClient,
    { provide: AddressRepository, useClass: AddressPrismaRepository },
  ]
})
export class AddressModule {}
