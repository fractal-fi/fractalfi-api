import { Module } from '@nestjs/common';
import { IndexerService } from './indexer.service';
import { IndexerController } from './indexer.controller';

@Module({
  providers: [IndexerService],
  controllers: [IndexerController]
})
export class IndexerModule {}
