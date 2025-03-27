import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'supersecret', // Usa la misma clave que el módulo
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      rol: payload.role, // ← ¡Aquí está el cambio!
    };
  }
}
