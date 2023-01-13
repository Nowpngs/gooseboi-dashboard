import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { LoginUserDto } from './dto/login-user.dto';

const saltOrRound = 10;
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new HttpException('User Already Exist', HttpStatus.CONFLICT);
    }
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltOrRound,
    );
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAllUser(): Promise<User[]> {
    return await this.prisma.user.findMany({ where: { deleted: false } });
  }

  async findOneUser(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  async removeUser(id: number): Promise<User> {
    return await this.prisma.user.update({
      where: { id: id },
      data: { deleted: true },
    });
  }

  async updateUserPassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.findOneUser(id);
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    const isCorrect = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );
    if (!isCorrect) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.prisma.user.update({
      where: { id: id },
      data: {
        password: await bcrypt.hash(updatePasswordDto.newPassword, saltOrRound),
      },
    });
  }

  async findUserLogin(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });
    if (!user || user.deleted) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    const isCorrect = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isCorrect) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email: email } });
  }

  async getPaginateUser(limit: number, page: number): Promise<User[]> {
    return await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { deleted: false },
    });
  }
}