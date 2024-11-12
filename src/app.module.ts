import { Module } from '@nestjs/common';
import { IndexerModule } from './indexer/indexer.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PriceModule } from './price/price.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ScheduleModule.forRoot(),
    IndexerModule,
    PriceModule
  ],
})
export class AppModule {}
