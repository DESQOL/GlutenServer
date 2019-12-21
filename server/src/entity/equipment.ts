import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { BaseEntity, InstructionStep } from '@entity';

@Entity()
export class Equipment extends BaseEntity<Equipment> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public image: string;

    @ManyToMany(() => InstructionStep)
    public instructionSteps: InstructionStep[];

    getDefault (): Equipment {
        const equipment = new Equipment();
        equipment.id = 0;
        equipment.name = '';
        equipment.image = '';
        equipment.instructionSteps = null;

        return equipment;
    }
}
