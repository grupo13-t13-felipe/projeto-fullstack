import { CanActivate, ExecutionContext, Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { PrismaService } from "src/database/prisma.service";
import { IAuthUser } from "src/interfaces/users";


@Injectable()
export class AddressOwnerGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly prismaService: PrismaService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const addressId = request.params.id
        const loggedUser = request.user as IAuthUser;

        const address = await this.prismaService.address.findUnique({
            where: { id: addressId },
            include: { user: true },
        })
        
        if(!address) {
            throw new NotFoundException("this address not found")
        }
        if(address.user.id === loggedUser.id) {
            return true;
        }

        throw new ForbiddenException("you are not owner of this address")
    }
}