import { Test, TestingModule } from '@nestjs/testing';
import { PoolLengthsService } from './pool-lengths.service';

describe('PoolLengthsService', () => {
  let service: PoolLengthsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoolLengthsService],
    }).compile();

    service = module.get<PoolLengthsService>(PoolLengthsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
