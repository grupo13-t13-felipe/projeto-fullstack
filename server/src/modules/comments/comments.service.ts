/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaClient) {}

  async create(createCommentDto: CreateCommentDto, announcement_id: string, owner_id: string) {

    const comment = await this.prisma.comment.create({
      data: {...createCommentDto, owner_id, announcement_id},
      include: {
        announcement: true,
        owner: {select: {id: true, name: true, email: true }}
      }
    })
    return comment;
  }

  async findAllByAnnoucement(annoucement_id: string) {
    const result = await this.prisma.comment.findMany({
      where: {
        announcement_id: annoucement_id,
      },
      include: {
        announcement: true,
        owner: {select: {id: true, name: true, email: true }}
      }
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
