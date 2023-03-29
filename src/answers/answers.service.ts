import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { Answer, IsCorrect } from './answer.entity';
import { QuestionsService } from '../questions/questions.service';
import { CreateAnswerDto } from './dto/createAnswer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
    private authService: AuthService,
    private questionsService: QuestionsService,
  ) {}

  async findAll(questionId: number): Promise<Answer[]> {
    try {
      const question = await this.questionsService.findQuestionsWithAnswers(questionId)
      return question.answers;
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async createAnswer(userInfo: any, questionId: number, createAnswerDto: CreateAnswerDto): Promise<Answer> {
    try {
      const question = await this.questionsService.findOne(questionId);
      const user = await this.authService.findUserByEmail(userInfo.email);

      if (user && question) {
        const answer = this.answerRepository.create({...createAnswerDto, user, question})
        
        await this.answerRepository.save(answer)
        return answer;
      } else {
        throw new UnauthorizedException('user or question not find')
      }
    } catch (error) {
      console.log(error)
      throw new ForbiddenException(error.message)
    }
  }

  async changeAnswerType(userInfo: any, isCorrect: string, answerId: number): Promise<Answer> {
    try {
      const answer = await this.answerRepository.findOneBy({id: answerId});
      const user = await this.authService.findUserByEmail(userInfo.email);
      if(!user) {
        throw new UnauthorizedException('user not exist')
      }
      if(isCorrect === "correct"){
        answer.isCorrect = IsCorrect.CORRECT;
      } else if(isCorrect === "inCorrect") {
        answer.isCorrect = IsCorrect.INCORRECT
      } else {
        answer.isCorrect = IsCorrect.UNKNOWN;
      }
      await this.answerRepository.save(answer)
      return answer;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
