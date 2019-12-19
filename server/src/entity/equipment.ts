import { Instruction } from '@entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class Equipment extends BaseEntity<Equipment> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public image: string;

    @ManyToOne(() => Instruction, instruction => instruction.equipment)
    public instruction: Instruction;

    getDefault (): Equipment {
        const equipment = new Equipment();
        equipment.id = 0;
        equipment.name = '';
        equipment.image = '';
        equipment.instruction = null;

        return equipment;
    }
}
