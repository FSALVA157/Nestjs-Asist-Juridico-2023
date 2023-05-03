import { Provincia } from 'src/provincias/entities/provincia.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Localidad {
  @PrimaryColumn()
  id_localidad: number;

  @Column('integer')
  provincia_id: number;

  @ManyToOne(() => Provincia, (type) => type.localidades)
  @JoinColumn({
    name: 'provincia_id',
    referencedColumnName: 'id_provincia',
  })
  provincia: Provincia;

  @Column('text')
  localidad: string;
}
