import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from './roles.decorator';
  import { UserRole } from 'src/usuarios/enums/user-role.enum';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [
          context.getHandler(), // método
          context.getClass(),   // controlador
        ],
      );
  
      if (!requiredRoles || requiredRoles.length === 0) {
        return true; // no hay roles requeridos, permitir acceso
      }
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user || !requiredRoles.includes(user.rol)) {
        throw new ForbiddenException('No tienes permiso para acceder a esta ruta');
      }
  
      return true;
    }
  }
  