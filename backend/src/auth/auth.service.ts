import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  private saltRounds = 12;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<UserResponseDto> {
    const exists = await this.usersService.findOneByEmail(dto.email);
    if (exists) throw new ConflictException('E-mail already in use');

    const passwordHash = await bcrypt.hash(dto.password, this.saltRounds);
    console.log(`pass=${dto.password};hash=${passwordHash}`);

    const user = await this.usersService.create({
      ...dto,
      password: passwordHash,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest as UserResponseDto;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;

    console.log(
      `dbpass=${user.password};pass=${await bcrypt.hash(pass, this.saltRounds)}`,
    );

    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = (await this.usersService.findOneByEmail(dto.email))!;
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, transactions, ...rest } = user;
    return { access_token: token, user: rest };
  }
}
