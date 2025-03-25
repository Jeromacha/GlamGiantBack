import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { IsBoolean, IsOptional, IsString, IsArray } from 'class-validator';


export class CreateUsuarioDto {
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(['ADMIN', 'CLIENT', 'EMPLOYEE', 'TESTER'])
  rol: string;

  @IsBoolean()
  @IsOptional()
  test_subject_status?: boolean;

  @IsString()
  @IsOptional()
  allergic_reactions?: string;

  @IsArray()
  @IsOptional()
  purchase_history?: string[];
}
