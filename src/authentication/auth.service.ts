import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LoginUserDto } from '../models/users/dto/login-user.dto';
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { UsersService } from '../models/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async userRegister(
    createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Account Create Success',
    };
    try {
      status.data = await this.userService.createUser(createUserDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async userLogin(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findUserLogin(loginUserDto);
    const token = this._createToken(loginUserDto.email);
    return { ...token, data: user };
  }

  private _createToken(email: string): any {
    const payload: JwtPayload = { email: email };
    const authorization = this.jwtService.sign(payload);
    return {
      expiresIn: process.env.EXPIRESIN,
      authorization,
    };
  }

  async userValidate(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.userService.findUserByEmail(jwtPayload.email);
    if (!user) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
