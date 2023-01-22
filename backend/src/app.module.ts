import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './models/prisma/prisma.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './authentication/auth.module';
import { ArtistsModule } from './models/artists/artists.module';
import { AlbumsModule } from './models/albums/albums.module';
import { TracksModule } from './models/tracks/tracks.module';

const importModules = [
  PrismaModule,
  UsersModule,
  AuthModule,
  ArtistsModule,
  AlbumsModule,
  TracksModule,
];
@Module({
  imports: importModules,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
