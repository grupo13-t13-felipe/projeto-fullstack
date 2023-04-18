import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class IsAnnoucementOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const annoucementId = request.params.annoucement_id;

    const annoucement = await this.prisma.annoucement.findFirst({
      where: { id: annoucementId },
    });

    if (user.id !== annoucement.owner_id) {
      throw new ForbiddenException(
        'This user are not allowed to interact with this annoucement',
      );
    }
    return true;
  }
}
