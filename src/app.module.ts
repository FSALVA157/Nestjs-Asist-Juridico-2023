import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/cliente.module';
import { ContraparteModule } from './contraparte/contraparte.module';
import { CommonModule } from './common/common.module';
import { ProvinciasModule } from './provincias/provincias.module';
import { LocalidadesModule } from './localidades/localidades.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.SUPER_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClienteModule,
    ContraparteModule,
    CommonModule,
    ProvinciasModule,
    LocalidadesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
