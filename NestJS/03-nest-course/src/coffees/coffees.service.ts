import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService, ConfigType } from '@nestjs/config';

import { PaginationQueryDto } from 'src/common/dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { globalConfig } from 'src/config';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepositiry: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepositiry: Repository<Flavor>,
    @Inject(ConfigService)
    private readonly configServive: ConfigService,
    @Inject(globalConfig.KEY)
    private readonly coffeeConfig: ConfigType<
      typeof globalConfig
    >,
  ) {
    console.log(this.configServive.get('DATABASE_HOST'));
    console.log(this.configServive.get('test.name'));
    console.log(this.configServive.get('coffees'));
    console.log(this.configServive.get('db'));
    console.log(this.coffeeConfig.foo);
  }

  async create(
    createCoffeeDto: CreateCoffeeDto,
  ): Promise<Coffee> {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name: string) =>
        this.preloadFlavorByName(name),
      ),
    );
    console.log(flavors);
    const coffee = this.coffeeRepositiry.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepositiry.save(coffee);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { page, size } = paginationQuery;
    return this.coffeeRepositiry.find({
      relations: ['flavors'],
      skip: (page - 1) * size,
      take: size,
    });
  }

  async findOne(id) {
    const coffee = await this.coffeeRepositiry.findOne(id, {
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(
        `Coffee #${id} not found`,
      );
    }
    return coffee;
  }

  async update(
    id: string,
    updateCoffeeDto: UpdateCoffeeDto,
  ) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name: string) =>
          this.preloadFlavorByName(name),
        ),
      ));
    const coffee = await this.coffeeRepositiry.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(
        `Coffee #${id} not found`,
      );
    }
    return this.coffeeRepositiry.save(coffee);
  }

  async delete(id) {
    const coffee = await this.findOne(id);
    return this.coffeeRepositiry.remove(coffee);
  }

  private async preloadFlavorByName(
    name: string,
  ): Promise<Flavor> {
    const existingFlavor =
      await this.flavorRepositiry.findOne({
        where: { name },
      });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepositiry.create({ name });
  }
}
