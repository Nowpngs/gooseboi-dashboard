import { ApiProperty } from '@nestjs/swagger';

export class ArtistNameListEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
