import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'the name of a coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'the brand of a coffee' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: ['ex', 'rt'] })
  @IsString({ each: true })
  readonly flavors: string[];
}
