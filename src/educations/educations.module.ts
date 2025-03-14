import { Module } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { EducationsController } from './educations.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [EducationsController],
  providers: [EducationsService,PrismaService,{provide: APP_GUARD, useClass: JwtAuthGuard}],
})
export class EducationsModule {}
