import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CaracterLetrado {
  @PrimaryGeneratedColumn()
  id_caracter_letrado: number;

  @Column('text', {
    unique: true,
  })
  caracter_letrado: string;

  @CreateDateColumn()
  fecha_alta: Date;

  @UpdateDateColumn()
  ultima_actualizacion: Date;

  @DeleteDateColumn()
  fecha_baja: Date;
}
