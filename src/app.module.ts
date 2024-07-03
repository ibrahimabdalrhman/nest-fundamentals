import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development.local'
          : '.staging.env',
      isGlobal: true,
      expandVariables: true,
    }),

    UserModule,
    CommonModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
