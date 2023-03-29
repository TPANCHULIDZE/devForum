import { ForbiddenException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findUser(email, undefined);
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const { password, ...result } = user;
          return {...result, access_token: await this.generateToken(result.username, result.id, result.email) };
        }
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async generateToken(username: string, id: number, email: string): Promise<string> {
    const payload = {username, id, email};
    return this.jwtService.sign(payload);
  }

  async findUserByEmail(email: string): Promise<any> {
    const user = await this.usersService.findUser(email, undefined);
    const {password, ...result} = user;
    return result;
  }

  async findUserById(userId: number): Promise<User> {
    try {
      return this.usersService.findUserById(userId)
    } catch (error) {
      throw new ForbiddenException('user not found')
    }
  }
}
