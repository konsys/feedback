import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class NounsEntity {
  @Column()
  @PrimaryColumn()
  @Index({ unique: true })
  nounId: number;

  @Column()
  length: number;

  @Column()
  @Index({ unique: true })
  value: string;
}
