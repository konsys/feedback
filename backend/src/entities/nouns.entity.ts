import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class NounsEntity {
  @PrimaryGeneratedColumn()
  nounId: number;

  @Column()
  length: number;

  @Column()
  @Index({ unique: true })
  value: string;
}
