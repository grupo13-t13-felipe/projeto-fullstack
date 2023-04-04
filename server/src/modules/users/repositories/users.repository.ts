import { CreateAddressDto } from "src/modules/address/dto/create-address.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";


export abstract class UsersRepository {
    abstract create(userDto: CreateUserDto, addressDto: CreateAddressDto): Promise<User>;
    abstract findAll(): Promise<User[]>
    abstract findOne(id: string): Promise<User | undefined>
    abstract findByEmail(email: string): Promise<User | undefined>
    abstract findByCpf(cpf: string): Promise<User | undefined>
    abstract findByPhone(phone: string): Promise<User | undefined>
    abstract update(id: string, data: UpdateUserDto): Promise<User>;
    abstract delete(id: string): Promise<void>;
}