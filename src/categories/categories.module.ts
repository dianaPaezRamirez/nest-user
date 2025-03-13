import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService,PrismaService,{
      provide: APP_GUARD,
      useClass: JwtAuthGuard, 
    },],
})

export class CategoriesModule {}
