import { CanActivate, ExecutionContext, Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { PrismaService } from "src/database/prisma.service";
import { IAuthUser } from "src/interfaces/users";

@Injectable()
export class AccountOwnerGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly prismaService: PrismaService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const accountId = request.params.id
        const loggedUser = request.user as IAuthUser;

        const account = await this.prismaService.user.findUnique({
            where: { id: accountId }
        })
        
        if(!account) {
            throw new NotFoundException("this account not found")
        }
        
        if(account.id === loggedUser.id) {
            return true;
        }

        throw new ForbiddenException("you are not owner of this account")
    }
}