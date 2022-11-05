import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from '../models/users/users.service';
import { PrismaService } from '../models/prisma/prisma.service';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: `${process.env.SECRETKEY}`,
      signOptions: { expiresIn: process.env.EXPIRESIN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
