// https://github.com/typestack/class-validator
import {
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  readonly flavors: string[];
}
