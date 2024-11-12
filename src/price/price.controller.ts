import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('price')
export class PriceController {
    constructor(
        private readonly _priceService: PriceService
    ) {}

    @Get()
    async price() {
        const price = await this._priceService.fetchBinanceDataFeed();
        return {
            price,
        }
    }
  
}
