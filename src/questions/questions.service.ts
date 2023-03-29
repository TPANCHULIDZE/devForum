import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { GroupsService } from '../groups/groups.service';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private authService: AuthService,
    private groupsService: GroupsService,
  ) {}

  async findAll(groupId: number): Promise<Question[]> {
    try {
      const group = await this.groupsService.findGroupWithQuestions(groupId);
      
      return group.questions;
    } catch(error) {
      throw new ForbiddenException(error.message)
    }
  }

  async createQuestion(
    userInfo: any,
    groupId: number,
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    try {
      
      const user = await this.authService.findUserByEmail(userInfo.email);
      const group = await this.groupsService.findOneById(groupId);
      const question = this.questionRepository.create({
        ...createQuestionDto,
        user,
        group,
      });
      await this.questionRepository.save(question);
      return question;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

}
