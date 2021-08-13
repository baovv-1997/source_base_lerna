import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/request/auth.request.dto';
import { LoginResponse } from './dto/response/auth.response.dto';
import { BaseController } from 'core/controllers/api.controller';
import { getTemplateResponseFor } from 'core/response/template.response';

@Controller('api/auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({
    type: getTemplateResponseFor(LoginResponse),
  })
  @Post('/login')
  create(@Body() createAuthDto: LoginRequest) {
    const resultLogin = this.authService.login(createAuthDto);

    return this.successResponse({ data: resultLogin });
  }
}
