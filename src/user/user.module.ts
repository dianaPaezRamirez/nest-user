import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma.service';
import { AuthMiddleware } from 'src/auth/middleware/auth/auth.middleware';

import { IsEmailUniqueConstraint } from './validators/is-email-unique.validator';

@Module({
  controllers: [UserController],
  providers: [UserService,PrismaService,IsEmailUniqueConstraint],
  exports: [IsEmailUniqueConstraint]
  
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user');
  }
}
