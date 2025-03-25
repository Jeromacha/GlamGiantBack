import { IsEnum, IsInt, IsNotEmpty, IsString, Min, Max } from 'class-validator';

export class CreateProductoMaquillajeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(['Lipstick', 'Foundation', 'Eyeshadow', 'Etc'])
  category: string;

  @IsInt()
  @Min(0)
  stock: number;

  @IsString()
  warehouse_location: string;

  @IsInt()
  @Min(1)
  @Max(10)
  durability_score: number;
}
