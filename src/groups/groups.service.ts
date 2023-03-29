import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/createGroup.dto';
import { Group } from './group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    private authService: AuthService,
  ) {}

  async createGroup(userInfo: any, createGroupDto: CreateGroupDto): Promise<Group> {
    try {
      const admin = await this.authService.findUserByEmail(userInfo.email)
      const group = this.groupRepository.create({...createGroupDto, admin});
  
      await this.groupRepository.save(group)
  
      return group;
    } catch(error) {
      throw new UnauthorizedException(error.message)
    }

  }

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async findOneById(id: number): Promise<Group> {
    return await this.groupRepository.findOneBy({id});
  }

  async findGroupWithQuestions(groupId: number): Promise<Group> {
    try {
      const group = await this.groupRepository.findOne({where:{id: groupId}, relations: {
        questions: true
      }})
      if(!group) {
        throw new ForbiddenException()
      }
      return group;
    } catch {
      throw new ForbiddenException('group not found')
    }
  }
}
