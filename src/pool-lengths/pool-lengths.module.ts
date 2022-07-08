import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolLength } from 'src/entities/pool-length.entity';
import { PoolLengthsService } from './pool-lengths.service';

@Module({
  imports: [TypeOrmModule.forFeature([PoolLength])],
  controllers: [],
  providers: [PoolLengthsService],
  exports: [PoolLengthsService],
})
export class PoolLengthsModule {}
