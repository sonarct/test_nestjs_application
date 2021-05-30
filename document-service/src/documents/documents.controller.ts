import { Controller } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/createDocument.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly DocumentsService: DocumentsService
  ) {}

  @MessagePattern({ cmd: 'get_user_documents' })
  getAllDocuments(data: { userId: number }) {
    return this.DocumentsService.getUserDocuments(data.userId);
  }

  @MessagePattern({ cmd: 'create_document' })
  createDocument(data: { document: CreateDocumentDto, userId: number }) {
    return this.DocumentsService.createDocument(data.document, data.userId);
  }

  @MessagePattern({ cmd: 'remove_user_documents' })
  removeDocuments(data: { userId: number }) {
    return this.DocumentsService.deleteUserDocuments(data.userId);
  }
}
