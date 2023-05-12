import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Fuero {
  @PrimaryGeneratedColumn()
  id_fuero: number;

  @Column('text', {
    unique: true,
  })
  fuero: string;

  @CreateDateColumn()
  fecha_alta: Date;

  @UpdateDateColumn()
  ultima_actualizacion: Date;

  @DeleteDateColumn()
  fecha_baja: Date;
}
