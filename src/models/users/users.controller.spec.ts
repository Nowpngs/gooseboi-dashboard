import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAll: jest.fn(),
    create: jest.fn(),
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
    it.todo('shuld return the create user');
  });

  describe('findAll', () => {
    it('should return all the active user', async () => {
      const expectResult = [
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
        .spyOn(mockUsersService, 'findAll')
        .mockResolvedValue(expectResult);
      await expect(controller.findAll()).resolves.toEqual(expectResult);
      expect(mockUserFindAll).toHaveBeenCalled();
    });
  });
});
