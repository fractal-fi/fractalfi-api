import { Entity, Column, ManyToOne, Generated } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';

@Entity({ name: 'incoming_txs' })
export class IncomingTx extends BaseEntity {
  constructor(partial: Partial<IncomingTx>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: 'varchar', length: 200, nullable: false })
  txId: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  senderAddress: string;

  @Column({ type: 'numeric', nullable: false })
  btcAmount: number;

  @Column({ type: 'json', nullable: true})
  step1Response: any;

  @Column({ type: 'json', nullable: true})
  step2Response: any;
}
