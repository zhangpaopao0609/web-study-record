import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  // private readonly items: Item[] = [
  //   {
  //     id: "21312321",
  //     name: "Item one",
  //     qty: 100,
  //     description: "This is item one"
  //   },
  //   {
  //     id: "432432425",
  //     name: "Item two",
  //     qty: 200,
  //     description: "This is item two"
  //   },
  // ];

  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  // findAll(): Item[] {
  //   return this.items;
  // }

  // findOne(id): Item {
  //   return this.items.find(item => item.id === id)
  // }
  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
