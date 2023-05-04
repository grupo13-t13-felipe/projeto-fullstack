import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AnnoucementExistsGuard implements CanActivate {
  constructor(private prisma: PrismaClient) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const annoucement = await this.prisma.annoucement.findFirst({
      where: { id: request.params.annoucement_id },
    });
    if (!annoucement) {
      throw new NotFoundException('This annoucement does not exists');
    }
    return true;
  }
}
