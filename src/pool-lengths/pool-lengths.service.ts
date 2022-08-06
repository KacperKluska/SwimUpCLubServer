import { Injectable } from '@nestjs/common';
import { PoolLength } from 'src/entities/pool-length.entity';
import { MyResponse } from 'src/shared_dto/response';
import { serverErrorResponse } from 'src/shared_dto/error';

@Injectable()
export class PoolLengthsService {
  async findAllPoolLengths(): Promise<MyResponse> {
    try {
      const poolLengths = await PoolLength.find();
      return {
        status: 200,
        data: { poolLengths },
        message: `Success`,
      };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  async findPoolLengthByLength(length: number): Promise<PoolLength> {
    return await PoolLength.findOne({ length });
  }
}
