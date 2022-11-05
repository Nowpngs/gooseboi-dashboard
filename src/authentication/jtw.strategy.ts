import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: `${process.env.SECRETKEY}`,
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.authService.validate(jwtPayload);
    if (!user) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
