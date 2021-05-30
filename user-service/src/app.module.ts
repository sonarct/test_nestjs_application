import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
