import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { LoginUserDto } from '../models/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnauthorizedResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOperation({ summary: 'register the user' })
  @Post('register')
  async userRegister(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<RegistrationStatus> {
    // Create a new user object from the input data
    const createUserDto: CreateUserDto = {
      ...registerUserDto,
      role: Role.USER,
    };
    // Call the registration service
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    // If an error occurs, throw an exception
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    // If registration was successful, return the status object
    return result;
  }

  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnauthorizedResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOperation({ summary: 'get the jwt token' })
  @Post('login')
  async userLogin(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}
