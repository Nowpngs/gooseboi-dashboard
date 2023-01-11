import {
  Body,
  Controller,
  Delete,
  Get,
  Request,
  Param,
  Patch,
  Post,
  UseGuards,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { HasRole } from '../../common/decorators/role/role.decorator';
import { RoleGuard } from '../../common/guards/role.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/users.entity';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: UserEntity, description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOperation({ summary: 'create the user' })
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
    description: 'The resources were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOperation({ summary: 'get the pagination of active user' })
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Get('paginate')
  async getPaginateUsers(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<User[]> {
    return this.usersService.getPaginateUser(limit, page);
  }

  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
    description: 'The resources were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'get all the active user' })
  @Get()
  async findAllUser(): Promise<User[]> {
    return await this.usersService.findAllUser();
  }

  @ApiOkResponse({
    type: UserEntity,
    description: 'The resource was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiOperation({ summary: 'find the user by id' })
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Get(':id')
  async findOneUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOneUser(+id);
  }

  @ApiOkResponse({
    type: UserEntity,
    description: 'The resource was updated successfully',
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiOperation({ summary: 'update the user by id' })
  @HasRole(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(+id, updateUserDto);
  }

  @ApiOkResponse({
    type: UserEntity,
    description: 'The resource was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiOperation({ summary: 'soft delete user by id' })
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.removeUser(+id);
  }

  @ApiOkResponse({
    type: UserEntity,
    description: 'The resource was updated successfully',
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiOperation({ summary: 'update password for user' })
  @HasRole(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Put('update-password')
  async updateUserPassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return this.usersService.updateUserPassword(req.user.id, updatePasswordDto);
  }
}
