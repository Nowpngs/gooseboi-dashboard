import { ApiProperty } from '@nestjs/swagger';
import { Track } from '@prisma/client';

export class TrackEntity implements Track {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  trackNumber: number;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  albumId: number;
}
