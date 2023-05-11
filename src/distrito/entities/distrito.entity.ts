import { Jurisdiccion } from 'src/jurisdiccion/entities/jurisdiccion.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Distrito {
  @PrimaryGeneratedColumn()
  id_distrito: number;

  @Column('text', {
    unique: true,
  })
  distrito: string;

  @Column('int')
  jurisdiccion_id: number;

  @ManyToOne(() => Jurisdiccion)
  @JoinColumn({
    name: 'jurisdiccion_id',
    referencedColumnName: 'id_jurisdiccion',
  })
  jurisdiccion: Jurisdiccion;

  //   @ManyToMany(() => Fuero)
  //   @JoinTable()
  //   fueros: Fuero[];
}
