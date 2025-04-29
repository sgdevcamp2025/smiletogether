import { Module } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ExternalApiService],
  exports: [ExternalApiService],
})
export class ExternalApiModule {}
