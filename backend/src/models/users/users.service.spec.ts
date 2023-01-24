import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { Role, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('createUser', () => {
    it('should throw an error if user already exists', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({
        id: faker.datatype.number(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.name.firstName(),
        role: Role.ADMIN,
        deleted: false,
        createdAt: faker.datatype.datetime(),
        updatedAt: faker.datatype.datetime(),
      } as User);

      const createUserDto: CreateUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: Role.ADMIN,
      };

      try {
        await userService.createUser(createUserDto);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.getResponse()).toBe('User Already Exist');
        expect(error.getStatus()).toBe(409);
      }
    });
  });
});
