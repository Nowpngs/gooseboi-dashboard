import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({ where: { deleted: false } });
  }

  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }
}
