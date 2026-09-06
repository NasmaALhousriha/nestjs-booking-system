import { Injectable ,UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
import { LoginDto } from './dto/login.dto.js';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
 async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

  
    const users = await this.userService.findAll();
    const user = users.find((u) => u.email === email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

  
    const payload = { sub: user.id, email: user.email, role: user.role };

   
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
