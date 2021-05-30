import { Controller, Get, Post, UseGuards, Req, Body, Put, Delete, Param, HttpStatus, HttpException } from '@nestjs/common';
import { RequestWithUser } from './auth/requestWithUser.interface';
import { JwtAuthGuard } from './auth/jwtAuth.guard';
import { AppService } from './app.service';
import { CreateDocumentDto } from './CreateDocumentDto'
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get('documents/:id')
  async getUserDocuments(@Param('id') userId: string) {
    return await this.appService.getUserDocuments(Number(userId))
  }

  @UseGuards(JwtAuthGuard)
  @Post('documents')
  async createDocument(@Body() document: CreateDocumentDto, @Req() request: RequestWithUser) {
    return await this.appService.createDocument(request.user.id, document)
  }

  @UseGuards(JwtAuthGuard)
  @Put('user/deactivate')
  async deactivate(@Req() request: RequestWithUser, @Body() data: { email: string }) {
    const result = await this.appService.deactivateUserByEmail(data.email)

    if (typeof result === 'string' && data.email === request.user.email) {
      request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    }

    return result
  }
}
