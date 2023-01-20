import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @ApiProperty()
  name: string;
}
