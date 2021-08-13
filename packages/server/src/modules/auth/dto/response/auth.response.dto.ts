import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  uid: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;
}
