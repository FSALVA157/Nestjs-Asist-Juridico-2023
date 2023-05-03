import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column('text', {
    unique: true,
  })
  dni_cuit: string;

  @Column('text')
  categoria: string;

  @Column('text', {
    nullable: true,
  })
  razon_social: string;

  @Column('text', {
    nullable: true,
  })
  nombre: string;

  @Column('text', {
    nullable: true,
  })
  apellido: string;

  @Column('text', {
    nullable: true,
  })
  domicilio_real: string;

  @Column('text', {
    nullable: true,
  })
  domicilio_alternativo: string;

  @Column('integer', {
    default: 5,
  })
  provincia_id: number;

  @Column('integer', {
    default: 5,
  })
  departamento_id: number;

  @Column('integer', {
    default: 5,
  })
  localidad_id: number;

  @Column('text', {
    nullable: true,
  })
  telefono_celular: string;

  @Column('text', {
    nullable: true,
  })
  telefono_alternativo: string;

  @Column('text', {
    nullable: true,
  })
  ocupacion: string;

  @Column('text', {
    nullable: true,
    unique: true,
  })
  email: string;

  @CreateDateColumn()
  fecha_alta: Date;

  @UpdateDateColumn()
  ultima_actualizacion: Date;

  @DeleteDateColumn()
  fecha_baja: Date;

  @BeforeInsert()
  checkCategoriaInsert(): void {
    this.categoria.toLowerCase();
  }

  @BeforeUpdate()
  checkCategoriaUpdate(): void {
    this.categoria.toLowerCase();
  }
}
