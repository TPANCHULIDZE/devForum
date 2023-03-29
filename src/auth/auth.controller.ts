import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { LocalStrategy } from "./local.startegy";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private localStartegy: LocalStrategy) {}

  @Post('/login')
  async login(@Body('user') loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.localStartegy.validate(loginDto.email, loginDto.password);
      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }
}