import { Question } from "../questions/question.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../users/user.entity";

export enum IsCorrect {
  UNKNOWN = 'unknown',
  CORRECT = 'correct',
  INCORRECT = 'incorrect'
}

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column({type: 'enum', enum: IsCorrect, default: IsCorrect.UNKNOWN })
  isCorrect: string;

  @ManyToOne(() => User, user => user.answers)
  user: User;

  @ManyToOne(() => Question, question => question.answers)
  question: Question;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}