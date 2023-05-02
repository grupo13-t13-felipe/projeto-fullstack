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

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('annoucements/:annoucement_id/comments')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('annoucements/:annoucement_id/comments')
  findAllByAnnoucement(@Param('annoucement_id') annoucement_id: string) {
    return this.commentsService.findAllByAnnoucement(annoucement_id);
  }

  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  } */

  @Patch('comments/:comment_id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete('comments/:comment_id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
