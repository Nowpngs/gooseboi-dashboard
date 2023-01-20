import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.findFirst({
      where: {
        title: createAlbumDto.title,
        artist: {
          some: {
            id: createAlbumDto.artistId,
          },
        },
      },
    });
    if (album) {
      throw new HttpException('Album already exists', HttpStatus.CONFLICT);
    }
    return await this.prisma.album.create({
      data: {
        title: createAlbumDto.title,
        description: createAlbumDto.description,
        albumCoverUrl: createAlbumDto.albumCoverUrl,
        releasedDate: createAlbumDto.releasedDate
          ? new Date(createAlbumDto.releasedDate)
          : null,
        artist: {
          connect: {
            id: createAlbumDto.artistId,
          },
        },
      },
    });
  }

  async findAllAlbums(): Promise<Album[]> {
    return await this.prisma.album.findMany({
      where: {
        deleted: false,
      },
    });
  }

  async getAlbumListFromArtist(artistId?: number): Promise<Album[]> {
    return await this.prisma.album.findMany({
      where: {
        deleted: false,
        artist: {
          some: {
            id: artistId,
          },
        },
      },
    });
  }
}
