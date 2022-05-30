// https://github.com/typestack/class-validator
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'Ther name of a coffee' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Ther brand of a coffee' })
  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @ApiProperty({ description: 'Ther flavors of a coffee' })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  readonly flavors: string[];
}
