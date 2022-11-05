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
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { LoginUserDto } from 'src/models/users/dto/login-user.dto';
import { UserEntity } from 'src/models/users/entities/users.entity';
import { AuthService } from './auth.service';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: UserEntity, description: 'Created Succesfully' })
  @ApiUnauthorizedResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOperation({ summary: 'register the user' })
  @Post('register')
  async userRegister(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.userRegister(
      createUserDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @ApiUnauthorizedResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOperation({ summary: 'get the jwt token' })
  @Post('login')
  async userLogin(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.authService.userLogin(loginUserDto);
  }
}
