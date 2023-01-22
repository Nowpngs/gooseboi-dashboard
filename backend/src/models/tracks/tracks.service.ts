import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    // Check if track already exists
    const track = await this.prisma.track.findFirst({
      where: {
        title: createTrackDto.title,
        trackNumber: createTrackDto.trackNumber,
        albumId: createTrackDto.albumId,
      },
    });
    if (track) {
      throw new HttpException('Track already exists', HttpStatus.CONFLICT);
    }
    // Create track
    return await this.prisma.track.create({
      data: {
        title: createTrackDto.title,
        trackNumber: createTrackDto.trackNumber,
        duration: createTrackDto.duration,
        albumId: createTrackDto.albumId,
      },
    });
  }

  async findAllTracks(): Promise<Track[]> {
    return await this.prisma.track.findMany({
      where: {
        deleted: false,
      },
    });
  }

  async getTracksListFromAlbum(albumId: number): Promise<Track[]> {
    return await this.prisma.track.findMany({
      where: {
        deleted: false,
        albumId: albumId,
      },
    });
  }
}
