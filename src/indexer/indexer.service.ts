// indexer.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { InscriptionDetailsResponseDto } from './dto/unisat.response.dto';

@Injectable()
export class IndexerService {
    private _unisatApiKey: string;
    
    constructor(
        private readonly _configService: ConfigService,
        private readonly _httpService: HttpService,
    ) {
        this._unisatApiKey = this._configService.get<string>('UNISAT_API_KEY');
    }

    async getInscriptionDetailsByAddress(
        address: string,
        ticker: string
    ): Promise<InscriptionDetailsResponseDto> {
        const url = `https://open-api-fractal-testnet.unisat.io/v1/indexer/address/${address}/brc20/${ticker}/info`;

        try {
            const response = await firstValueFrom(
                this._httpService.get(url, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${this._unisatApiKey}`,
                    },
                }).pipe(
                    map(response => response.data),
                    catchError(error => {
                        throw new HttpException(
                            `Failed to fetch inscription details: ${error.response?.data?.msg || 'Unknown error'}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                )
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve inscription details: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAddressSummary(address: string): Promise<{ [ticker: string]: { availableBalance: string; transferableBalance: string } }> {
        const tickers = ['test_BTC4', 'test_FUSD'];
        const balances = {};

        for (const ticker of tickers) {
            try {
                const details = await this.getInscriptionDetailsByAddress(address, ticker);
                balances[ticker] = {
                    availableBalance: details.availableBalance,
                    transferableBalance: details.transferableBalance,
                };
            } catch (error) {
                balances[ticker] = {
                    availableBalance: "0",
                    transferableBalance: "0",
                };
            }
        }
        return balances;
    }
}
