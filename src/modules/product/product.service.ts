import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';
import { CreateProductRequest } from './request/create-user.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
    ) {}

    getProduct(): string {
        return 'Product!!!!!!';
    }

    async createProduct(createProductRequest: CreateProductRequest): Promise<ProductEntity> {
        const product = new ProductEntity();
        product.name = createProductRequest.name;
        product.stock = createProductRequest.stock;
        return this.productRepository.save(product);
    }
}
