import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private async findOneProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }

  async createProduct(prodName: string, price: number, updateDate: string) {
    const newProduct = new this.productModel({
      name: prodName,
      price: price,
      updateDate: updateDate,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getAllProducts() {
    const allProducts = await this.productModel.find();
    return allProducts as Product[];
  }
}
