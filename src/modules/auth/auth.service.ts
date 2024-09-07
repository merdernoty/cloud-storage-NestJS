import { UsersService } from '../users/users.service';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(dto);
      return {
        token: this.jwtService.sign({ id: newUser.id }),
      };
    } catch (error) {
      Logger.error(`Registration error: ${error.message}`);
      throw new ForbiddenException('Registration Error');
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
