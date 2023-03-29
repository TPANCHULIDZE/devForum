import { Group } from "../groups/group.entity";
import { User } from "../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}