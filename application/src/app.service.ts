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

  async deactivateUserById(userId: string) {
    if (!userId) {
      return new HttpException('Please, provide correct user id', HttpStatus.BAD_REQUEST)
    }

    try {
      const user = await this.usersService.send(
        { cmd: 'get_user_by_id' },
        { userId }
      ).toPromise()

      if (!user) {
        return new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND)
      }

      await this.usersService.send(
        { cmd: 'deactivate_user' },
        { userId }
      ).toPromise()

      this.documentsService.send(
        { cmd: 'remove_user_documents' },
        { userId }
      ).toPromise()
    } catch (error) {
      return new HttpException(`Problems while deactivating user ${userId}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
    return `User ${userId} has been deactivated`
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
