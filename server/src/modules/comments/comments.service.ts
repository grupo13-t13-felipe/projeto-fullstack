/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCommentDto: CreateCommentDto,
    announcement_id: string,
    owner_id: string,
  ) {
    const comment = await this.prisma.comment.create({
      data: { ...createCommentDto, owner_id, announcement_id },
      include: {
        announcement: true,
        owner: { select: { id: true, name: true, email: true } },
      },
    });
    return comment;
  }

  async findAllByAnnoucement(annoucement_id: string) {
    const result = await this.prisma.comment.findMany({
      where: {
        announcement_id: annoucement_id,
      },
      include: {
        announcement: true,
        owner: { select: { id: true, name: true, email: true } },
      },
    });
    return result;
  }

  async update(commentId: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.prisma.comment.update({
      where: { id: commentId },
      include: {
        announcement: true,
        owner: { select: { id: true, name: true, email: true } },
      },
      data: updateCommentDto,
    });
    return comment;
  }

  async remove(commentId: string) {
    const comment = await this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
