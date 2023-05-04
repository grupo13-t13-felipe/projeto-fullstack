import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ImageExistsGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

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
