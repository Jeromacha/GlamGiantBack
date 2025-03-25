import { IsInt, IsString, Min, Max } from 'class-validator';

export class CreateProductoMaquillajeDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsInt()
  stock: number;

  @IsString()
  warehouse_location: string;

  @IsInt()
  @Min(0)
  @Max(10)
  durability_score: number;

  @IsInt()
  @Min(0)
  @Max(10)
  safety_score: number;

  @IsInt()
  @Min(0)
  @Max(10)
  magical_score: number;
}