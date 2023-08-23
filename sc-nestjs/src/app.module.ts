import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './authentication/AuthModule';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from './database/DatabaseModule';

@Module({
  imports: [DatabaseModule, PassportModule, AuthModule],
  controllers: [AppController],
  providers: [JwtService, AppService],
})
export class AppModule {}
