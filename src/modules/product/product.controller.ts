import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {  IUserData } from 'src/modules/auth/strategy/interface/user-data.interface';
import { GetCurrentUserDataById } from 'src/decorators/get-userdata-by-id.decorator';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductRequest } from './request/create-user.request';

@UseGuards(AuthGuard('jwt'))
@Controller('product')
export class ProductController {
    constructor( private productService: ProductService){}

    @Get()
    getProduct(@GetCurrentUserDataById() user: IUserData) {
        return this.productService.getProduct()
    }

    @Post()
    createProduct(@Body() createProductRequest: CreateProductRequest, @GetCurrentUserDataById() user: IUserData) {
        return `name: ${createProductRequest.name}, stock: ${createProductRequest.stock}, userId: ${user.userId}`
    }

    @Post('/db')
    createProductDB(@Body() createProductRequest: CreateProductRequest): Promise<ProductEntity> {
        return this.productService.createProduct(createProductRequest);
    }
}

