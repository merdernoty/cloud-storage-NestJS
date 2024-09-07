import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/users/entities/user.entity';
import { FileEntity } from './modules/files/entities/file.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [UserEntity, FileEntity],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    UsersModule,
    FilesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
