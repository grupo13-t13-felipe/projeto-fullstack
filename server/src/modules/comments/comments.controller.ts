/* eslint-disable prettier/prettier */
import { Request, UseGuards } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {Request as req} from 'express'
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface UserRequest extends req {
  user: User
}

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('annoucements/:annoucement_id/comments')
  create(
    @Body() createCommentDto: CreateCommentDto, 
    @Param('annoucement_id') annoucement_id: string, 
    @Request() request: UserRequest
    ) {
    return this.commentsService.create(createCommentDto, annoucement_id, request.user.id);
  }

  @Get('annoucements/:annoucement_id/comments')
  findAllByAnnoucement(@Param('annoucement_id') annoucement_id: string) {
    return this.commentsService.findAllByAnnoucement(annoucement_id);
  }

  @Patch('comments/:comment_id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete('comments/:comment_id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
