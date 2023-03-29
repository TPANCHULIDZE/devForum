import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Group } from '../groups/group.entity';
import { Question } from '../questions/question.entity';
import { Answer } from '../answers/answer.entity';


export enum userRole {
  ADMIN = 'admin',
  USER = 'user',
  UNKNOWN = 'unknown',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: userRole, default: userRole.USER })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Answer, answer => answer.user)
  answers: Answer[];

  @ManyToMany(() => Group, group => group.users)
  @JoinTable()
  groups: Group[];

  @OneToMany(() => Group, group => group.admin)
  adminOf: Group[];

  @OneToMany(() => Question, question => question.user)
  questions: Question[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
