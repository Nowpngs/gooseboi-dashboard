import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Artist, Role } from '@prisma/client';
import { HasRole } from '../../common/decorators/role/role.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistNameListEntity } from './entities/artist-name-list.entity';
import { ArtistEntity } from './entities/artists.entity';
import { ArtistNameList } from './interface/artist-name-list.interface';

@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @ApiCreatedResponse({
    type: ArtistEntity,
    description: 'Created Succesfully',
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOperation({ summary: 'create the artist' })
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async createUser(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistsService.createArtist(createArtistDto);
  }

  @ApiOkResponse({
    type: ArtistNameListEntity,
    isArray: true,
    description: 'The resources were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'get all the artist name and id as list' })
  @Get('name-list')
  async getArtistsNameList(): Promise<ArtistNameList[]> {
    return await this.artistsService.getArtistNameList();
  }
}
