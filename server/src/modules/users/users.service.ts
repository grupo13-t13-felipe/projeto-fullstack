/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { PrismaService } from 'src/database/prisma.service';
import { UsersPrismaRepository } from './repositories/prisma/users.prisma.repository';
import { MailService } from 'src/utils/mail.service';
import { randomUUID } from 'node:crypto';
import { hashSync } from 'bcryptjs';
import 'dotenv/config';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private prismaRepository: UsersPrismaRepository,
    private mailService: MailService,
  ) {}
  async create(
    createUserDto: CreateUserDto,
    createAddressDto: CreateAddressDto,
  ) {
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

    if (findUser) {
      const keys = ['email', 'cpf', 'phone'];
      keys.forEach((key) => {
        if (findUser[key] == createUserDto[key]) {
          throw new ConflictException(`this ${key} already in use`);
        }
      });
    }

    return this.prismaRepository.create(createUserDto, createAddressDto);
  }

  findAll() {
    return this.prismaRepository.findAll();
  }

  async findOne(id: string) {
    const findUser = await this.prismaRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('user not found');
    }
    return findUser;
  }

  async findByEmail(email: string) {
    const findUser = await this.prismaRepository.findByEmail(email);
    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUserToUpdate = await this.prismaRepository.findOne(id);
    if (!findUserToUpdate) {
      throw new NotFoundException('user not found');
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

    if (findUser && findUser.id !== id) {
      const keys = ['email', 'cpf', 'phone'];
      keys.forEach((key) => {
        if (findUser[key] === updateUserDto[key]) {
          throw new ConflictException(`this ${key} already in use`);
        }
      });
    }

    return this.prismaRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const findUser = await this.prismaRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('user not found');
    }
    return this.prismaRepository.delete(id);
  }

  async sendResetEmailPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = randomUUID();

    await this.prisma.user.update({
      where: { email },
      data: {
        reset_token: resetToken,
      },
    });

    const resetPasswordTemplate = this.mailService.resetPassword(
      email,
      user.name,
      resetToken,
    );

    await this.mailService.sendEmail(resetPasswordTemplate);
  }

  async resetPassword(password: string, resetToken: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        reset_token: resetToken,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashSync(password, 10),
        reset_token: undefined,
      },
    });
  }
}
