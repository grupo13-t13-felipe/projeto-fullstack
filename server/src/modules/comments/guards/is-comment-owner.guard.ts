import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class IsCommentOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const comment_id = request.params.comment_id;
    const user_id = request.user.id;
    const comment = await this.prisma.comment.findFirst({
      where: { id: comment_id },
    });

    if (comment.owner_id !== user_id) {
      throw new HttpException(
        'You are not allowed to interact with this comment',
        401,
      );
    }

    return true;
  }
}
