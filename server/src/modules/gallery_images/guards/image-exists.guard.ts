import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ImageExistsGuard implements CanActivate {
  constructor(private prisma: PrismaClient) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const image = await this.prisma.galleryImage.findFirst({
      where: { id: request.params.image_id },
    });
    if (!image) {
      throw new NotFoundException('This image does not exists');
    }
    return true;
  }
}
