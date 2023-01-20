import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  artistId: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  releasedDate?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  albumCoverUrl?: string;
}
