import { UserResponseDto } from './user-response.dto';

export class LoginResponseDto {
  access_token: string;
  user: UserResponseDto;
}
