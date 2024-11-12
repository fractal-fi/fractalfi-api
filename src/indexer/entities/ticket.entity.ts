import { Entity, Column, ManyToOne, Generated } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';

@Entity({ name: 'tickets' })
export class Ticket extends BaseEntity {
  constructor(partial: Partial<Ticket>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: 'varchar', length: 200, nullable: false })
  txId: string;

  @Column({ type: 'number', length: 200, nullable: false })
  liquidationThreshold: number;
}
