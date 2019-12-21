import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@entity';

@Entity()
export class Equipment extends BaseEntity<Equipment> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public image: string;

    getDefault (): Equipment {
        const equipment = new Equipment();
        equipment.id = 0;
        equipment.name = '';
        equipment.image = '';

        return equipment;
    }
}
