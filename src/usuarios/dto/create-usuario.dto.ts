import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
  IsBoolean,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { TesterType } from '../enums/tester-type.enum';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(UserRole, {
    message: 'rol debe ser uno de los siguientes valores: ADMIN, CLIENT, EMPLOYEE, TESTER',
  })
  rol: UserRole;

  @IsOptional()
  @IsEnum(TesterType, {
    message: 'tester_type debe ser NORMAL, DWARF o SPECIAL',
  })
  tester_type?: TesterType;

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

