import { Group } from "../groups/group.entity";
import { User } from "../users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Answer } from "../answers/answer.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  description: string

  @ManyToOne(() => Group, group => group.questions)
  group: Group;

  @ManyToOne(() => User, user => user.questions)
  user: User;

  @OneToMany(() => Answer, answer => answer.question)
  answers: Answer[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}