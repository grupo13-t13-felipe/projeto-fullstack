import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  async findAllByAnnoucement(annoucement_id: string) {
    const result = await this.prisma.comment.findMany({
      where: {
        announcement_id: annoucement_id,
      },
    });
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
