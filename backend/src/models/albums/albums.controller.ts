import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Album, Role } from '@prisma/client';
import { HasRole } from 'src/common/decorators/role/role.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumEntity } from './entities/albums.entity';

@ApiTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiCreatedResponse({
    type: AlbumEntity,
    description: 'Created Succesfully',
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOperation({ summary: 'create the album entity' })
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumsService.createAlbum(createAlbumDto);
  }

  @ApiOkResponse({
    type: AlbumEntity,
    isArray: true,
    description: 'The resources were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'get all the album (with artist filter)' })
  @Get()
  async findAllAlbum(@Query('artist_id') artistId: string): Promise<Album[]> {
    // Check if a specific artist id was passed in
    if (!artistId) {
      // If not, return all albums
      return await this.albumsService.findAllAlbums();
    }
    // Otherwise, return albums from a specific artist
    return await this.albumsService.getAlbumListFromArtist(parseInt(artistId));
  }
}
