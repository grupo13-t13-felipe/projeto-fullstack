import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private prisma: PrismaService
  ) {}
  async create(createUserDto: CreateUserDto, createAddressDto: CreateAddressDto) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { cpf: createUserDto.cpf },
          { phone: createUserDto.phone },
        ],
      },
      select: {
        email: true,
        cpf: true,
        phone: true,
      },
    });
    
    if(findUser) {
      const keys = ["email", "cpf", "phone"]
      keys.forEach(key => {
        if(findUser[key] == createUserDto[key]) {
          throw new ConflictException(`this ${key} already in use`)
        }
      })
    }

    return this.usersRepository.create(createUserDto, createAddressDto);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const findUser = await this.usersRepository.findOne(id);
    if(!findUser) {
      throw new NotFoundException("user not found");
    }
    return findUser;
  }

  async findByEmail(email: string) {
    const findUser = await this.usersRepository.findByEmail(email);
    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUserToUpdate = await this.usersRepository.findOne(id);
    if(!findUserToUpdate) {
      throw new NotFoundException("user not found");
    }

    const findUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: updateUserDto.email },
          { cpf: updateUserDto.cpf },
          { phone: updateUserDto.phone },
        ],
      },
      select: {
        id: true,
        email: true,
        cpf: true,
        phone: true,
      },
    });
    
    if(findUser && findUser.id !== id) {
      const keys = ["email", "cpf", "phone"]
      keys.forEach(key => {
        if(findUser[key] === updateUserDto[key]) {
          throw new ConflictException(`this ${key} already in use`)
        }
      })
    }

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const findUser = await this.usersRepository.findOne(id);
    if(!findUser) {
      throw new NotFoundException("user not found");
    }
    return this.usersRepository.delete(id);
  }
}
