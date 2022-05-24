import { Test, TestingModule } from '@nestjs/testing';
import { UsersCoachesController } from './users-coaches.controller';

describe('UsersCoachesController', () => {
  let controller: UsersCoachesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersCoachesController],
    }).compile();

    controller = module.get<UsersCoachesController>(UsersCoachesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
