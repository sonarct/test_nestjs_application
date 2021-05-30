import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/createDocument.dto';
import { Document } from './document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document) private DocumentsRepository: Repository<Document>
  ) {}

  getUserDocuments(userId: number) {
    return this.DocumentsRepository.find({
      where: { userId },
      select: ['title', 'content', 'id']
    });
  }

  async createDocument(Document: CreateDocumentDto, userId: number) {
    const newDocument = this.DocumentsRepository.create({ ...Document, userId });
    await this.DocumentsRepository.save(newDocument);
    return newDocument;
  }

  async deleteUserDocuments(userId: number) {
    return await this.DocumentsRepository.delete({ userId })
  }
}
