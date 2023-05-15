import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TipoProceso {
  @PrimaryGeneratedColumn()
  id_tipo_proceso: number;

  @Column('text', {
    unique: true,
  })
  tipo_proceso: string;

  // @OneToMany(type => Etapa,etapa => etapa.tipo,{onDelete: "CASCADE",cascade: true})
  // etapas : Etapa[];

  //   @OneToMany((type) => Objeto, (objeto) => objeto.tipo_de_proceso, {
  //     cascade: true,
  //   })
  //   objetos: Objeto[];

  @CreateDateColumn()
  fecha_alta: Date;

  @UpdateDateColumn()
  ultima_actualizacion: Date;

  @DeleteDateColumn()
  fecha_baja: Date;
}
