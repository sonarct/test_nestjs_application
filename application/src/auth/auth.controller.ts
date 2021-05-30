import { Body, Req, Controller, HttpCode, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RequestWithUser } from './requestWithUser.interface';
import { LocalAuthGuard } from './localAuth.guard';
import { JwtAuthGuard } from './jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie)
    const { password, ...rest } = user;
    return rest;
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    request.res.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const { user } = request;
    const { password, ...rest } = user;
    return rest;
  }
}
