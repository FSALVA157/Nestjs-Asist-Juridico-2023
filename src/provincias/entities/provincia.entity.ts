import { Localidad } from 'src/localidades/entities/localidad.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Provincia {
  @PrimaryColumn()
  id_provincia: number;

  @Column('text', {
    unique: true,
  })
  provincia: string;

  @OneToMany(() => Localidad, (type) => type.provincia, {
    onDelete: 'CASCADE',
    eager: true,
    cascade: true,
  })
  localidades: Localidad[];
}
