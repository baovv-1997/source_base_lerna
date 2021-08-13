import { Injectable } from '@nestjs/common';
import { LoginResponse } from './dto/response/auth.response.dto';
import { LoginRequest } from './dto/request/auth.request.dto';

@Injectable()
export class AuthService {
  login(loginData: LoginRequest): LoginResponse {
    console.log(loginData);

    return { email: 'test@test.com', refreshToken: 'sdff', token: 'dfdf', uid: 'dfdf' };
  }
}
