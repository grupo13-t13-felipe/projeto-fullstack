import { Injectable } from '@nestjs/common';
import { UsersPrismaRepository } from '../users/repositories/prisma/users.prisma.repository';

@Injectable()
export class ProfileService {
    constructor(private prismaRepository: UsersPrismaRepository) {}

    async findOne(id: string) {
        const user = await this.prismaRepository.findOne(id);
        return user;
    }
}
