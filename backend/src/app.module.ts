import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './models/prisma/prisma.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './authentication/auth.module';
import { ArtistsModule } from './models/artists/artists.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
