import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistNameList } from './interface/artist-name-list.interface';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    // Validate if the artist already exists
    const artist = await this.prisma.artist.findUnique({
      where: { name: createArtistDto.name },
    });
    // If it does, throw an HttpException with the status code of 409 (Conflict)
    if (artist) {
      throw new HttpException('Artist Already Exist', HttpStatus.CONFLICT);
    }
    // If it doesn't, create the artist
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  // Get all the artists name list from database
  async getArtistNameList(): Promise<ArtistNameList[]> {
    return await this.prisma.artist.findMany({
      // Filter out those that have been marked as deleted.
      where: { deleted: false },
      // Return the name and id of the artist.
      select: { name: true, id: true },
    });
  }
}
