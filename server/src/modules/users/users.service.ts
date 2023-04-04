import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { CreateAddressDto } from '../address/dto/create-address.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto, createAddressDto: CreateAddressDto) {
    const findEmail = await this.usersRepository.findByEmail(
      createUserDto.email,
    )
    if(findEmail) {
      throw new ConflictException("this email already in use")
    }
    const findCpf = await this.usersRepository.findByCpf(
      createUserDto.cpf,
    )
    if(findCpf) {
      throw new ConflictException("this cpf already in use")
    }
    const findPhone = await this.usersRepository.findByPhone(
      createUserDto.phone,
    )
    if(findPhone) {
      throw new ConflictException("this phone already in use")
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

  async findByCpf(cpf: string) {
    const findUser = await this.usersRepository.findByCpf(cpf);
    return findUser;
  }

  async findByPhone(phone: string) {
    const findUser = await this.usersRepository.findByPhone(phone);
    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.findOne(id);
    if(!findUser) {
      throw new NotFoundException("user not found");
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
