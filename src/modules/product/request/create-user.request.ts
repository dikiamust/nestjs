import { IsNotEmpty } from "class-validator";


export class CreateProductRequest{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    stock: number;
}