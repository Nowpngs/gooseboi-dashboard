import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistNameList } from './interface/artist-name-list.interface';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({
      where: { name: createArtistDto.name },
    });
    if (artist) {
      throw new HttpException('Artist Already Exist', HttpStatus.CONFLICT);
    }
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  async getArtistNameList(): Promise<ArtistNameList[]> {
    return await this.prisma.artist.findMany({
      where: { deleted: false },
      select: { name: true, id: true },
    });
  }
}
