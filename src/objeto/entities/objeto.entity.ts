import { Fuero } from 'src/fuero/entities/fuero.entity';
import { TipoProceso } from 'src/tipo-proceso/entities/tipo-proceso.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Objeto {
  @PrimaryGeneratedColumn()
  id_objeto: number;

  @Column('text')
  objeto: string;

  @Column('int')
  tipo_proceso_id: number;

  @ManyToOne(() => TipoProceso, { eager: true })
  @JoinColumn({
    name: 'tipo_proceso_id',
    referencedColumnName: 'id_tipo_proceso',
  })
  tipo_proceso: TipoProceso;

  @Column('int')
  fuero_id: number;

  @ManyToOne(() => Fuero, { eager: true })
  @JoinColumn({
    name: 'fuero_id',
    referencedColumnName: 'id_fuero',
  })
  fuero: Fuero;

  @CreateDateColumn()
  fecha_alta: Date;

  @UpdateDateColumn()
  ultima_actualizacion: Date;

  @DeleteDateColumn()
  fecha_baja: Date;
}
