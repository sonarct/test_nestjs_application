import { Controller, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(data: { userId: number }) {
    try {
      return await this.usersService.getById(data.userId)
    } catch (error) {
      return null
    }
  }

  @MessagePattern({ cmd: 'get_user_by_email' })
  async getUserByEmail(data: { email: string }) {
    try {
      return await this.usersService.getByEmail(data.email)
    } catch(error) {
      return null
    }
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(data: { user: CreateUserDto }) {
    try {
      return await this.usersService.create(data.user)
    } catch(error) {
      return null
    }
  }

  @MessagePattern({ cmd: 'deactivate_user' })
  async deactivateUser(data: { userId: number }) {
    try {
      return await this.usersService.deactivate(data.userId);
    } catch(error) {
      return null
    }
  }
}
