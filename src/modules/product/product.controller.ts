import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductRequest } from './request/create-user.request';

@Controller('product')
export class ProductController {
    constructor(public productService: ProductService){}

    @Get()
    getProduct(): string{
        return this.productService.getProduct()
    }

    @Post()
    createProduct(@Body() createProductRequest: CreateProductRequest): string {
        return `name: ${createProductRequest.name}, stock: ${createProductRequest.stock}`
    }
}

