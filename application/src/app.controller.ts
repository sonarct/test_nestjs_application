import { Controller, Get, Param, Post, UseGuards, Req, Body, Put } from '@nestjs/common';
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
  @Get('user/:id/documents')
  async getUserDocuments(@Param('id') userId: string) {
    return await this.appService.getUserDocuments(Number(userId))
  }

  @UseGuards(JwtAuthGuard)
  @Post('documents')
  async createDocument(@Body() document: CreateDocumentDto, @Req() request: RequestWithUser) {
    return await this.appService.createDocument(request.user.id, document)
  }

  @UseGuards(JwtAuthGuard)
  @Put('user/:id/deactivate')
  async deactivate(@Req() request: RequestWithUser, @Param('id') id: string) {
    const result = await this.appService.deactivateUserById(id)

    const isDeactivatedUserCurrentUser = Number(id) === request.user.id && typeof result === 'string'

    if (isDeactivatedUserCurrentUser) {
      request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    }

    return result
  }
}
