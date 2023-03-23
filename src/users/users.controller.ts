import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseInterceptors } from "@nestjs/common";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { Get } from "@nestjs/common";
import { createUserDto } from "./dto/createUser.dto";


@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/all')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body('user') createUserDto: createUserDto): Promise<User> {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new Error(error)
    }
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<string> {
    return this.usersService.deleteUser(userId)
  }
}