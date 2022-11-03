import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  password?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string;

  @IsEnum(Role)
  @ApiProperty()
  role: Role;
}
