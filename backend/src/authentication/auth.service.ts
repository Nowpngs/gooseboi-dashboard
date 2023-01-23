import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LoginUserDto } from '../models/users/dto/login-user.dto';
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { UsersService } from '../models/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { JwtToken } from './interfaces/jwt-token.interface';
import { LoginStatus } from './interfaces/login-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  // Register new user
  async register(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    // Create a variable to hold the status of the registration process.
    let status: RegistrationStatus = {
      success: true,
      message: 'Account Create Success',
    };
    // Try to create a user
    try {
      // If successful, store the user in the status variable.
      status.data = await this.userService.createUser(createUserDto);
    } catch (err) {
      // If there is an error, return the error message.
      status = {
        success: false,
        message: err,
      };
    }
    // Return the status variable.
    return status;
  }

  // Create a JWT token for the given email address.
  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // Find user in database
    const user = await this.userService.findUserLogin(loginUserDto);
    // Create JWT token
    const token: JwtToken = this._createToken(loginUserDto.email);
    // Return JWT token and user data
    return { ...token, data: user };
  }

  // Create JWT token
  private _createToken(email: string): JwtToken {
    const payload: JwtPayload = { email: email };
    const authorization = this.jwtService.sign(payload);
    return {
      expiresIn: process.env.EXPIRESIN,
      authorization,
    };
  }

  async validate(jwtPayload: JwtPayload): Promise<User> {
    // Get user from database
    const user = await this.userService.findUserByEmail(jwtPayload.email);
    // If user does not exist, throw an unauthorized exception
    if (!user) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
    // Return user
    return user;
  }
}
