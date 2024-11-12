import { Module } from '@nestjs/common';
import { IndexerModule } from './indexer/indexer.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ScheduleModule.forRoot(),
    IndexerModule
  ],
})
export class AppModule {}
