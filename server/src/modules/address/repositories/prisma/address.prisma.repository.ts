import { PrismaService } from "src/database/prisma.service";
import { UpdateAddressDto } from "../../dto/update-address.dto";
import { Address } from "../../entities/address.entity";
import { AddressRepository } from "../address.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AddressPrismaRepository implements AddressRepository {
    constructor(private prisma: PrismaService) {}
    async findAll(): Promise<Address[]> {
        const addresses: Address[] = await this.prisma.address.findMany();
        return addresses;
    }
    async findOne(id: string): Promise<Address> {
        const address = await this.prisma.address.findUnique({
            where: { id },
        });
        return address;
    }
    async update(id: string, data: UpdateAddressDto): Promise<Address> {
        const address = await this.prisma.address.update({
            where: { id },
            data: { ...data },
        });
        return address;
    }
}