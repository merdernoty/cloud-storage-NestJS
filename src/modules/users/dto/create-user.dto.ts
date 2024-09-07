import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'test@test.com' })
  email: string;
  @ApiProperty({ default: 'Igor' })
  fullname: string;
  @ApiProperty({ default: '12345' })
  password: string;
}
