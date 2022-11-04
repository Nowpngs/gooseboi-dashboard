import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';

const saltOrRound = 10;
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        saltOrRound,
      );
    }
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAllUser(): Promise<User[]> {
    return await this.prisma.user.findMany({ where: { deleted: false } });
  }

  async findOneUser(id: number): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async removeUser(id: number): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
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
    if (!user.password) {
      return await this.passwordUpdate(id, updatePasswordDto.newPassword);
    }
    const isCorrect = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );
    if (!isCorrect) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.passwordUpdate(id, updatePasswordDto.newPassword);
  }

  async passwordUpdate(id: number, newPassword: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id: id },
      data: {
        password: await bcrypt.hash(newPassword, saltOrRound),
      },
    });
  }
}
