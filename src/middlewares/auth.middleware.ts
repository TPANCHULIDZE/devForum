import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { AuthService } from "src/auth/auth.service";


interface DecodedToken {
  id: string;
  username: string;
  email: string;
}


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService, private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const access_token = req.headers.authorization?.split(' ')[1]
    if(access_token) {
      try {
        const secret = this.configService.get('JWT_SECRET')
        const decoded = jwt.verify(access_token, secret) as DecodedToken;
        req.user = {
          id: decoded.id,
          email: decoded.email,
          username: decoded.username
        }
      } catch (error) {
        throw new UnauthorizedException(error.message)
      }
    }
    next();
  }
}