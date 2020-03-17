import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class Users {
  @PrimaryGeneratedColumn()
  abstract id: bigint;

  @Column()
  abstract name: string;

  @Column()
  abstract surname: string;

  @Column()
  abstract country: string;

  @Column()
  abstract city: string;


  @Column()
  abstract height: number;

  @Column()
  abstract weight: number;

  @Column()
  abstract birthday: number;


  @Column()
  abstract hairColor: string;

  @Column()
  abstract eyesColor: string;

  @Column()
  abstract telefon: string;

  @Column()
  abstract email: string;

  @Column()
  abstract password: string;
}
