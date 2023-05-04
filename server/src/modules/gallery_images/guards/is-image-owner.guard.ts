import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class IsImageOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaClient) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const imageId = request.params.image_id;
    const image = await this.prisma.galleryImage.findFirst({
      where: { id: imageId },
    });
    const annoucement = await this.prisma.annoucement.findFirst({
      where: { id: image.annoucement_id },
    });
    if (user.id !== annoucement.owner_id) {
      throw new ForbiddenException(
        'This user is not allowed to interact with this image',
      );
    }
    return true;
  }
}
