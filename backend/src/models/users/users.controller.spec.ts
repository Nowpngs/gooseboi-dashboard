import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { Role, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAllUser: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('create', () => {
    it('should return the create user', async () => {
      const createUserDto: CreateUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.name.firstName(),
        role: Role.ADMIN,
      };
      const expectResult: User = {
        id: faker.datatype.number(),
        email: createUserDto.email,
        password: createUserDto.password,
        name: createUserDto.name,
        role: createUserDto.role,
        createdAt: faker.datatype.datetime(),
        updatedAt: faker.datatype.datetime(),
        deleted: faker.datatype.boolean(),
      };
      const mockCreateUser = jest
        .spyOn(mockUsersService, 'createUser')
        .mockResolvedValue(expectResult);
      await expect(controller.createUser(createUserDto)).resolves.toEqual(
        expectResult,
      );
      expect(mockCreateUser).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all the active user', async () => {
      const expectResult: User[] = [
        {
          id: faker.datatype.number(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          name: faker.name.firstName(),
          role: Role.ADMIN,
          createdAt: faker.datatype.datetime(),
          updatedAt: faker.datatype.datetime(),
          deleted: faker.datatype.boolean(),
        },
      ];
      const mockUserFindAll = jest
        .spyOn(mockUsersService, 'findAllUser')
        .mockResolvedValue(expectResult);
      await expect(controller.findAllUser()).resolves.toEqual(expectResult);
      expect(mockUserFindAll).toHaveBeenCalled();
    });
  });

  describe('fineOne', () => {
    it.todo('should return one user');
  });
});
