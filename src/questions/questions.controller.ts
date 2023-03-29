import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { Question } from './question.entity';
import { QuestionsService } from './questions.service';

@Controller('groups/:groupId/questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  async findAll(
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<Question[]> {
    try {
      return await this.questionsService.findAll(groupId);
    } catch(error) {
      throw new ForbiddenException(error.message)
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async createQuestion(
    @Req() req: Request,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body('question') createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return await this.questionsService.createQuestion(
      req.user,
      groupId,
      createQuestionDto,
    );
  }
}
