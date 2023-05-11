import { Distrito } from 'src/distrito/entities/distrito.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Jurisdiccion {
  @PrimaryGeneratedColumn()
  id_jurisdiccion: number;

  @Column('text', {
    unique: true,
  })
  jurisdiccion: string;

  @OneToMany(() => Distrito, (type) => type.jurisdiccion, {
    onDelete: 'CASCADE',
    eager: true,
  })
  distritos: Distrito[];

  @CreateDateColumn()
  fecha_alta: Date;

  @UpdateDateColumn()
  ultima_actualizacion: Date;

  @DeleteDateColumn()
  fecha_baja: Date;
}
