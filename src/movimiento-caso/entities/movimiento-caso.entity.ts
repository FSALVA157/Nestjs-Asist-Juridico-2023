import { Caso } from 'src/casos/entities/caso.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MovimientoCaso {
  @PrimaryGeneratedColumn()
  id_mov_caso: number;

  @Column('integer')
  caso_id: number;

  //relacion con tabla clientes
  @ManyToOne(() => Caso, (type) => type.movimientos, {
    eager: true,
  })
  @JoinColumn({
    name: 'caso_id',
    referencedColumnName: 'id_caso',
  })
  caso: Caso;

  @Column('date')
  fecha: Date;

  @Column('text', {
    nullable: true,
  })
  detalle: string;

  @Column('text')
  tipo_movimiento: string;

  @Column('text')
  etapa: string;

  @CreateDateColumn()
  fecha_alta: Date;

  @UpdateDateColumn()
  ultima_actualizacion: Date;

  @DeleteDateColumn()
  fecha_baja: Date;
}
