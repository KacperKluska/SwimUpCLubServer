import { Injectable } from '@nestjs/common';
import { PoolLength } from 'src/entities/pool-length.entity';

@Injectable()
export class PoolLengthsService {
  async findAllPoolLengths(): Promise<PoolLength[]> {
    return await PoolLength.find();
  }

  async findPoolLengthByLength(length: number): Promise<PoolLength> {
    return await PoolLength.findOne({ length });
  }
}
