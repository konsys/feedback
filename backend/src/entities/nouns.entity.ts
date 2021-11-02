import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NounsEntity {
  @PrimaryGeneratedColumn()
  nounId: number;

  @Column()
  length: number;

  @Column()
  @Index({ unique: true })
  value: string;

  @Column()
  firstLetter: string;

  @Column()
  endLetter: string;
}
