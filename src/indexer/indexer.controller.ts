// indexer.controller.ts
import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { IndexerService } from './indexer.service';

@Controller('indexer')
export class IndexerController {
    constructor(private readonly indexerService: IndexerService) {}

    @Get('address/:address/summary')
    async getSummary(
        @Param('address') address: string,
    ) {
        try {
            return this.indexerService.getAddressSummary(address);
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to retrieve summary',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
