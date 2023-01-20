import { ApiProperty } from '@nestjs/swagger';

export class ArtiestNameListEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
