import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductRequest } from './request/create-user.request';

@Controller('product')
export class ProductController {
    constructor( private productService: ProductService){}

    @Get()
    getProduct(): string{
        return this.productService.getProduct()
    }

    @Post()
    createProduct(@Body() createProductRequest: CreateProductRequest): string {
        return `name: ${createProductRequest.name}, stock: ${createProductRequest.stock}`
    }

    @Post('/db')
    createProductDB(@Body() createProductRequest: CreateProductRequest): Promise<ProductEntity> {
        return this.productService.createProduct(createProductRequest);
    }
}

