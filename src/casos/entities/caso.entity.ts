import { MovimientoCaso } from 'src/movimiento-caso/entities/movimiento-caso.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EtapaDto } from '../dto/etapa.dto';
import { Jurisdiccion } from 'src/jurisdiccion/entities/jurisdiccion.entity';
import { Distrito } from 'src/distrito/entities/distrito.entity';
import { Fuero } from 'src/fuero/entities/fuero.entity';
import { CaracterLetrado } from 'src/caracter_letrado/entities/caracter_letrado.entity';
import { TipoProceso } from 'src/tipo-proceso/entities/tipo-proceso.entity';
import { Objeto } from 'src/objeto/entities/objeto.entity';

@Entity()
export class Caso {
  @PrimaryGeneratedColumn()
  id_caso: number;

  @OneToMany(() => MovimientoCaso, (type) => type.caso, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  movimientos: MovimientoCaso[];

  @Column('jsonb', {
    array: false,
    nullable: true,
    default: [],
  })
  etapas: EtapaDto[];

  @Column('date')
  fecha_inicio: Date;

  @Column('date', {
    nullable: true,
  })
  fecha_fin: Date;

  @Column('text', {
    nullable: true,
  })
  detalle: string;

  @Column('text', {
    nullable: true,
    unique: true,
  })
  expediente_nro: string;

  @Column('int')
  jurisdiccion_id: number;

  // relacion con tabla jurisdiccion
  @ManyToOne(() => Jurisdiccion, {
    eager: true,
  })
  @JoinColumn({
    name: 'jurisdiccion_id',
    referencedColumnName: 'id_jurisdiccion',
  })
  jurisdiccion: Jurisdiccion;

  @Column('int')
  distrito_id: number;
  // //relacion con tabla distrito
  @ManyToOne(() => Distrito, { eager: true })
  @JoinColumn({
    name: 'distrito_id',
    referencedColumnName: 'id_distrito',
  })
  distrito: Distrito;

  @Column('int')
  fuero_id: number;

  //relacion con tabla fuero
  @ManyToOne(() => Fuero, { eager: true })
  @JoinColumn({
    name: 'fuero_id',
    referencedColumnName: 'id_fuero',
  })
  fuero: Fuero;

  @Column('int')
  tipo_proceso_id: number;

  @Column('int')
  objeto_id: number;

  @ManyToOne(() => Objeto, { eager: true })
  @JoinColumn({
    name: 'objeto_id',
    referencedColumnName: 'id_objeto',
  })
  objeto: Objeto;

  @ManyToOne(() => TipoProceso, { eager: true })
  @JoinColumn({
    name: 'tipo_proceso_id',
    referencedColumnName: 'id_tipo_proceso',
  })
  tipo: TipoProceso;

  @Column('int')
  caracter_letrado_id: number;

  @ManyToOne(() => CaracterLetrado, { eager: true })
  @JoinColumn({
    name: 'caracter_letrado_id',
    referencedColumnName: 'id_caracter_letrado',
  })
  caracter_letrado: CaracterLetrado;

  // @AfterLoad()
  // misEtapas() {
  //   let arreglo: string[] = [];
  //   if (this.movimientos != undefined) {
  //     this.movimientos.forEach((element) => {
  //       if (!arreglo.includes(element.etapa)) {
  //         arreglo.push(element.etapa);
  //       }
  //       this.etapas = arreglo;
  //     });
  //   } else {
  //     this.etapas = [];
  //   }
  // }

  // @OneToMany((type) => Alerta, (alerta) => alerta.caso, {
  //   onDelete: 'CASCADE',
  //   cascade: true,
  // })
  // alertas: Alerta[];

  // @OneToMany((type) => RegistroContable, (asiento) => asiento.caso, {
  //   onDelete: 'CASCADE',
  //   cascade: true,
  // })
  // asientos: RegistroContable[];

  // @Column({
  //   type: 'int',
  // })
  // @IsInt({ message: 'La clave de cliente debe ser un entero' })
  // cliente_id: number;

  // //relacion con tabla clientes
  // @ManyToOne((type) => Cliente, { eager: true })
  // @JoinColumn({
  //   name: 'cliente_id',
  //   referencedColumnName: 'id_cliente',
  // })
  // cliente: Cliente;

  // @Column({
  //   type: 'varchar',
  //   length: 100,
  //   nullable: true,
  // })
  // @IsOptional()
  // @Length(2, 100, {
  //   message:
  //     'El nombre de la contraparte debe tener entre $constraint1 y $constraint2 caracteres',
  // })
  // contraparte_nombre: string;

  // @Column({
  //   type: 'varchar',
  //   length: 100,
  //   nullable: true,
  // })
  // @IsOptional()
  // @Length(2, 100, {
  //   message:
  //     'El apellido de la contraparte debe tener entre $constraint1 y $constraint2 caracteres',
  // })
  // contraparte_apellido: string;

  // @Column({
  //   type: 'varchar',
  //   length: 100,
  //   nullable: true,
  // })
  // @IsOptional()
  // @Length(2, 100, {
  //   message:
  //     'La Razón Social de la contraparte debe tener entre $constraint1 y $constraint2 caracteres',
  // })
  // contraparte_razon_social: string;

  // @Column({
  //   type: 'varchar',
  //   length: 20,
  //   nullable: true,
  // })
  // @IsOptional()
  // @Length(7, 20, {
  //   message:
  //     'El dni de la contraparte debe tener entre $constraint1 y $constraint2 caracteres',
  // })
  // contraparte_dni: string;

  // @Column({
  //   type: 'varchar',
  //   length: 100,
  //   nullable: true,
  // })
  // @IsOptional()
  // @Length(2, 100, {
  //   message:
  //     'El domicilio real de la contraparte  debe tener entre $constraint1 y $constraint2 caracteres',
  // })
  // contraparte_dom_real: string;

  // @Column({
  //   type: 'varchar',
  //   length: 100,
  //   nullable: true,
  // })
  // @IsOptional()
  // @Length(2, 100, {
  //   message:
  //     'El domicilio procesal de la contraparte  debe tener entre $constraint1 y $constraint2 caracteres',
  // })
  // contraparte_dom_proc: string;

  // @Column({
  //   type: 'varchar',
  //   length: 50,
  //   nullable: true,
  // })
  // @IsOptional()
  // @MinLength(7)
  // contraparte_telefono: string;

  // @Column({
  //   type: 'varchar',
  //   length: 300,
  //   nullable: true,
  // })
  // @IsOptional()
  // @Length(5, 100, {
  //   message:
  //     'Los datos del abogado deben tener entre $constraint1 y $constraint2 caracteres',
  // })
  // contraparte_abogado: string;

  // @Column({
  //   type: 'int',
  //   nullable: true,
  // })
  // @IsOptional()
  // @IsInt({ message: 'El fuero debe ser un entero' })
  // fuero_id: number;

  // //relacion con tabla fuero
  // @ManyToOne((type) => Fuero, { eager: true })
  // @JoinColumn({
  //   name: 'fuero_id',
  //   referencedColumnName: 'id_fuero',
  // })
  // fuero: Fuero;

  // @Column({
  //   type: 'int',
  //   nullable: true,
  // })
  // @IsOptional()
  // @IsInt({ message: 'El juzgado debe ser un entero' })
  // juzgado_id: number;

  // @ManyToOne((type) => Juzgado, { eager: true })
  // @JoinColumn({
  //   name: 'juzgado_id',
  //   referencedColumnName: 'id_juzgado',
  // })
  // juzgado: Juzgado;

  // @Column({
  //   type: 'int',
  // })
  // @IsInt({ message: 'La clave de carácter del cliente debe ser un entero' })
  // caracter_cliente_id: number;

  // @Column({
  //   type: 'varchar',
  //   length: 100,
  //   nullable: true,
  // })
  // @Length(1, 100, {
  //   message:
  //     'La caratula debe tener entre $constraint1 y $constraint2 caracteres',
  // })
  // @IsOptional()
  // mesa: string;

  // @Column({
  //   type: 'int',
  //   nullable: true,
  // })
  // @IsOptional()
  // @IsInt({ message: 'La instancia debe ser un entero' })
  // instancia_id: number;

  // @ManyToOne((type) => Instancia, { eager: true })
  // @JoinColumn({
  //   name: 'instancia_id',
  //   referencedColumnName: 'id_instancia',
  // })
  // instancia: Instancia;

  // @Column({
  //   type: 'varchar',
  //   length: 100,
  //   nullable: true,
  // })
  // @Length(10, 100, {
  //   message:
  //     'La caratula debe tener entre $constraint1 y $constraint2 caracteres',
  // })
  // @IsOptional()
  // caratula: string;

  // @Column({
  //   type: 'int',
  //   default: 1,
  //   nullable: true,
  // })
  // @IsOptional()
  // @IsInt({ message: 'El estado del caso es una clave entera' })
  // estado_id: number;

  // @ManyToOne((type) => EstadoCaso, { eager: true })
  // @JoinColumn({
  //   name: 'estado_id',
  //   referencedColumnName: 'id_estado',
  // })
  // estado: EstadoCaso;

  // @Column({
  //   type: 'int',
  //   nullable: true,
  // })
  // @IsOptional()
  // @IsInt({ message: 'La etapa debe ser un entero' })
  // etapa: number;

  // @Column({
  //   type: 'decimal',
  //   precision: 14,
  //   scale: 2,
  //   default: 0,
  //   nullable: true,
  // })
  // @IsOptional()
  // @IsDecimal()
  // monto_juicio: number;

  // @Column({
  //   default: true,
  //   nullable: true,
  // })
  // @IsOptional()
  // visible: boolean;

  // @DeleteDateColumn()
  // fecha_baja: Date;
  @CreateDateColumn()
  fecha_alta: Date;

  @UpdateDateColumn()
  ultima_actualizacion: Date;

  @DeleteDateColumn()
  fecha_baja: Date;
}
