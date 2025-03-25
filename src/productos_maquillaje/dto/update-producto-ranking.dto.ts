import { IsInt, Min, Max } from 'class-validator';

export class UpdateProductoRankingDto {
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
