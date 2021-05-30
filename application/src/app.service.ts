import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateDocumentDto } from './CreateDocumentDto'

@Injectable()
export class AppService {
  constructor(
     @Inject('USERS') private readonly usersService: ClientProxy,
     @Inject('DOCUMENTS') private readonly documentsService: ClientProxy,
  ) {
  }

  async deactivateUserByEmail(email: string) {
    if (!email) {
      return new HttpException('Please, provide correct email', HttpStatus.BAD_REQUEST)
    }

    try {
      const user = await this.usersService.send(
        { cmd: 'get_user_by_email' },
        { email }
      ).toPromise()

      if (!user) {
        return new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND)
      }

      await this.usersService.send(
        { cmd: 'deactivate_user' },
        { userId: user.id }
      ).toPromise()

      this.documentsService.send(
        { cmd: 'remove_user_documents' },
        { userId: user.id }
      ).toPromise()
    } catch (error) {
      return new HttpException(`Problems while deactivating user ${email}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
    return `User with email ${email} has been deactivated`
  }

  async removeUserDocuments(userId: number) {
    return await this.documentsService.send(
      { cmd: 'remove_user_documents' },
      { userId }
    ).toPromise()
  }

  async createDocument(userId: number, document: CreateDocumentDto) {
    return await this.documentsService.send(
      { cmd: 'create_document' },
      { document, userId }
    ).toPromise()
  }

  async getUserDocuments(userId: number) {
    return await this.documentsService.send(
      { cmd: 'get_user_documents' },
      { userId: userId }
    ).toPromise()
  }
}
