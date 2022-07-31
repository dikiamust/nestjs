import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import {  TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';

@Module({
  imports: [
    ProductModule, 
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mypass2200',
      database: 'nestjs',
      entities: [ProductEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
