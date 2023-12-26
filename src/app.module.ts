import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'project',
      password: '123456',
      username: 'root',
      port: 3306,
      host: 'localhost',
      logging: true,
      synchronize: true, // 同步
      connectorPackage: 'mysql2',
      entities: [User],
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    JwtModule.register({
      global: true,
      secret: 'hello world',
      signOptions: {
        expiresIn: 120,
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
