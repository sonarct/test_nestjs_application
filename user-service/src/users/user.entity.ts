import { Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ unique: true })
  public email!: string;

  @Column()
  public name!: string;

  @Column()
  public password!: string;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
