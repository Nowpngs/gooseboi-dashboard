import { ApiProperty } from '@nestjs/swagger';
import { Album } from '@prisma/client';

export class AlbumEntity implements Album {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  releasedDate: Date;

  @ApiProperty()
  albumCoverUrl: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deleted: boolean;
}
