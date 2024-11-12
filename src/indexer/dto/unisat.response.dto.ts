export class TransferableInscriptionDto {
    content: any;
    data: {
        op: string;
        tick: string;
        lim: string;
        amt: string;
        decimal: string;
    };
    inscriptionNumber: number;
    inscriptionId: string;
    satoshi: number;
    confirmations: number;
}

export class InscriptionDetailsResponseDto {
    ticker: string;
    selfMint: boolean;
    overallBalance: string;
    transferableBalance: string;
    availableBalance: string;
    availableBalanceSafe: string;
    availableBalanceUnSafe: string;
    transferableCount: number;
    transferableInscriptions: TransferableInscriptionDto[];
    historyCount: number;
    historyInscriptions: any[];
}
