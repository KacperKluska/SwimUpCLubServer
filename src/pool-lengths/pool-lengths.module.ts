import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolLength } from 'src/entities/pool-length.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PoolLength])],
  controllers: [],
  providers: [],
})
export class PoolLengthsModule {}
