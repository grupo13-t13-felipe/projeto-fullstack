import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CommentExistsGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const comment_id = request.params.comment_id;
    const comment = await this.prisma.comment.findFirst({
      where: { id: comment_id },
    });

    if (!comment) {
      throw new HttpException('This comment does not exist', 404);
    }

    return true;
  }
}
