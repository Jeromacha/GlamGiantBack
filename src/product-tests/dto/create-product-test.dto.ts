import { IsUUID, IsString, IsInt, Min, Max, IsBoolean } from 'class-validator';

export class CreateProductTestDto {
  @IsUUID()
  tester_id: string;

  @IsUUID()
  product_id: string;

  @IsString()
  reaction: string;

  @IsInt()
  @Min(1)
  @Max(10)
  rating: number;

  @IsBoolean()
  survival_status: boolean;
}
