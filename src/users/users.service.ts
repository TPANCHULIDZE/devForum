import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(dto: CreateUserDto): Promise<any> {
    try {
      const user = this.userRepository.create(dto);
      await this.userRepository.save(user);
      const {password, ...result} = user;
      return {
        ...result,
        access_token: await this.authService.generateToken(
          user.username,
          user.id,
          user.email,
        ),
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async deleteUser(userId: number): Promise<string> {
    const user = await this.userRepository.findBy({ id: userId });
    await this.userRepository.remove(user);

    return 'user is delete successfully';
  }

  async findUser(email: string, username: string): Promise<User> {
    try {
      if(email) {
        const user = await this.userRepository.findOneBy({ email });
        return user;
      }
      if(username) {
        const user = await this.userRepository.findOneBy({username})
        return user;
      }
      
      throw new UnauthorizedException('user not found')
    } catch (error) {
      throw new ForbiddenException('user or password is incorrect');
    }
  }

  async findUserById(userId: number): Promise<User> {
    return await this.userRepository.findOneBy({id: userId})
  }
}
