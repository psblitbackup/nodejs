import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Territory } from './entities/territory.entity';
import { TerritoriesService } from './territories.service';
import { TerritoriesController } from './territories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Territory])],
  controllers: [TerritoriesController],
  providers: [TerritoriesService],
  exports: [TypeOrmModule]
})
export class TerritoriesModule {}
