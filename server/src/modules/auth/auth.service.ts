import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IAuthUser } from 'src/interfaces/users';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if(user) {
            const pass = await compare(password, user.password)
            if(pass) {
                const { id, email } = user;
                return { id, email };
            }
        }
        return null;
    }

    async login(user: IAuthUser) {
        const payload = { email: user.email, sub: user.id };
        const objectUser = await this.usersService.findOne(user.id)
        return {
            token: this.jwtService.sign(payload),
            user: objectUser,
        };
    }
}
