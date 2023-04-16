import { PrismaService } from "src/database/prisma.service";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { User } from "../../entities/user.entity";
import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateAddressDto } from "src/modules/address/dto/create-address.dto";

@Injectable()
export class UsersPrismaRepository {
    constructor(private prisma: PrismaService) {}
    async create(userDto: CreateUserDto, addressDto: CreateAddressDto): Promise<User> {
        const address = await this.prisma.address.create({
            data: {
                ...addressDto
            }
        });

        const user = await this.prisma.user.create({
            data: {
                ...userDto,
                address: {
                    connect: {
                        id: address.id,
                    },
                },
            },
            include: {
                address: true,
            },
        });
        return plainToInstance(User, user);
    }
    async findAll(): Promise<User[]> {
        const users: User[] = await this.prisma.user.findMany();
        return plainToInstance(User, users);
    }
    async findOne(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { address: true }
        });
        return plainToInstance(User, user);
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return user;
    }
    async update(id: string, data: UpdateUserDto): Promise<User> {
        const user = await this.prisma.user.update({
            where: { id },
            data: { ...data },
        });
        return plainToInstance(User, user);
    }
    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }
}