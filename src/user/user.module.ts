import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma.service';

import { IsEmailUniqueConstraint } from './validators/is-email-unique.validator';
import { APP_GUARD } from '@nestjs/core';
import {  JwtAuthGuard } from 'src/auth/auth.guard';


@Module({
  controllers: [UserController],
  providers: [UserService,PrismaService,IsEmailUniqueConstraint,  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard, 
  }, ],
  exports: [IsEmailUniqueConstraint],
  
})
export class UserModule  {
}
