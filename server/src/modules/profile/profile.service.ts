import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/repositories/users.repository';

@Injectable()
export class ProfileService {
    constructor(private usersRepository: UsersRepository) {}

    async findOne(id: string) {
        const user = await this.usersRepository.findOne(id);
        return user;
    }
}
