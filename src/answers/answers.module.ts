import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { Answer } from './answer.entity';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    AuthModule,
    QuestionsModule
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
