import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodesModule } from './nodes/nodes.module';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  imports: [NodesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
