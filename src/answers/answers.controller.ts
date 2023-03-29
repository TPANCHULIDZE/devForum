import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { Answer, IsCorrect } from './answer.entity';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/createAnswer.dto';
import { UpdateAnswerDto } from './dto/updateAnswer.dto';

@Controller('questions/:questionId/answers')
export class AnswersController {
  constructor(private answersService: AnswersService) {}

  @Get()
  async findAll(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Answer[]> {
    try {
      return await this.answersService.findAll(questionId);
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async createAnswer(
    @Req() req: Request,
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body('answer') createAnswerDto: CreateAnswerDto,
  ): Promise<Answer> {
    try {
      return await this.answersService.createAnswer(req.user, questionId, createAnswerDto);
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  @UseGuards(AuthGuard)
  @Patch('/:answerId')
  async updateAnswer(@Req() req: Request, @Param('answerId', ParseIntPipe) answerId: number ,@Body('answer') updatedAnswerDto: UpdateAnswerDto): Promise<Answer> {
    return await this.answersService.changeAnswerType(req.user, updatedAnswerDto.isCorrect, answerId);
  }
}
