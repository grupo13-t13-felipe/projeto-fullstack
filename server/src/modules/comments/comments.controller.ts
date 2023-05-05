/* eslint-disable prettier/prettier */
import { HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
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
import { Request as req } from 'express';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountOwnerGuard } from '../users/guards/account-owner.guard';
import { AnnoucementExistsGuard } from '../annoucements/guards/annoucement-exists.guard';
import { CommentExistsGuard } from './guards/comment-exists.guard';
import { IsCommentOwnerGuard } from './guards/is-comment-owner.guard';

interface UserRequest extends req {
  user: User;
}

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard, AnnoucementExistsGuard)
  @Post('annoucements/:annoucement_id/comments')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('annoucement_id') annoucement_id: string,
    @Request() request: UserRequest,
  ) {
    return this.commentsService.create(
      createCommentDto,
      annoucement_id,
      request.user.id,
    );
  }

  @UseGuards(AnnoucementExistsGuard)
  @Get('annoucements/:annoucement_id/comments')
  findAllByAnnoucement(@Param('annoucement_id') annoucement_id: string) {
    return this.commentsService.findAllByAnnoucement(annoucement_id);
  }

  @UseGuards(JwtAuthGuard, CommentExistsGuard, IsCommentOwnerGuard)
  @Patch('comments/:comment_id')
  update(
    @Param('comment_id') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(commentId, updateCommentDto);
  }

  @UseGuards(JwtAuthGuard, CommentExistsGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('comments/:comment_id')
  remove(@Param('comment_id') commentId: string) {
    return this.commentsService.remove(commentId);
  }
}
