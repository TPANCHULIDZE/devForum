import { Inject, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async createUser(dto: createUserDto): Promise<any> {
    try {
      const user = this.userRepository.create(dto)
      await this.userRepository.save(user)
      // return { username, email, role, created_at, updated_at } = user;
      return
    } catch (error) {
      throw new Error('email is already in use')
    }
  }

  async deleteUser(userId: number): Promise<string> {
    const user =  await this.userRepository.findBy({id: userId});
    await this.userRepository.remove(user)

    return 'user is delete successfully'
  }
}
