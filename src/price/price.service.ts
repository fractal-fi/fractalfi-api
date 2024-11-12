import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PriceService {
    constructor(
        private readonly _httpService: HttpService 
    ) {}

    async fetchBinanceDataFeed() {
        console.log('invoked');
        const response = await this._httpService.post('https://oracle.binance.com/api/gw/symbol-price', {
            sign: true,
            symbols: "BTC/USD"
        }).toPromise();
        
        const priceData = response.data.data[0];
        // let's just floor it, few cents don't make difference for hackathon. 
        const price = Math.floor(priceData.price / Math.pow(10, priceData.scale));
        return price;
    }
}
