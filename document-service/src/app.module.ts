import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DocumentsModule } from './documents/documents.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    DocumentsModule,
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
