import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Role, Track } from '@prisma/client';
import { HasRole } from '../../common/decorators/role/role.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackEntity } from './entities/tracks.entity';
import { TracksService } from './tracks.service';

@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @ApiCreatedResponse({
    type: TrackEntity,
    description: 'Created Succesfully',
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOperation({ summary: 'create the song track entity' })
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.tracksService.createTrack(createTrackDto);
  }

  @ApiOkResponse({
    type: TrackEntity,
    isArray: true,
    description: 'The resources were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'get all the song track (with album filter)' })
  @Get()
  async findAllTrack(@Query('album_id') albumId: string): Promise<Track[]> {
    if (!albumId) {
      return await this.tracksService.findAllTracks();
    }
    return await this.tracksService.getTracksListFromAlbum(parseInt(albumId));
  }
}
