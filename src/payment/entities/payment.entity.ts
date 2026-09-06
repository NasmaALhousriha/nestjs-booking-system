import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    currency: string;

    @Column()
    amount: number;

    @Column({default: true})
    isActive: boolean;


}


// create table in database with name payment 
// define columns like class and map with database columns
