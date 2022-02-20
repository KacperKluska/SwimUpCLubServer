import { Injectable } from '@nestjs/common';
import { Gender } from 'src/entities/gender.entity';
import { PoolLength } from 'src/entities/pool-length.entity';
import { SwimmingStyle } from 'src/entities/swimming-style.entity';
import { UserRole } from 'src/entities/user-role.entity';
import { WorkoutTypes } from 'src/entities/workout-types.entity';
import { Workout } from 'src/entities/workout.entity';

@Injectable()
export class SeedsService {
  async generateGenders(): Promise<string> {
    try {
      const male = new Gender('Man');
      const female = new Gender('Woman');
      const notBinary = new Gender('Not binary');

      const result = await Gender.save([male, female, notBinary]);
      if (result?.length) return 'Successfully generated new genders';
    } catch (e) {
      return 'Error occurred when trying to add new genders';
    }
  }

  async generateUserRoles(): Promise<string> {
    try {
      const user = new UserRole('USER');
      const coach = new UserRole('COACH');
      const admin = new UserRole('ADMIN');

      const result = await UserRole.save([user, coach, admin]);
      if (result?.length) return 'Successfully generated new user roles';
    } catch (e) {
      return 'Error occurred when trying to add new roles';
    }
  }

  async generateWorkoutTypes(): Promise<string> {
    try {
      const sprint = new WorkoutTypes('sprint');

      const result = await WorkoutTypes.save([sprint]);
      if (result?.length) return 'Successfully generated new workout types';
    } catch (e) {
      return 'Error occurred when trying to add workout types';
    }
  }

  async generatePoolLengths(): Promise<string> {
    try {
      const shortPool = new PoolLength(25);
      const longPool = new PoolLength(50);

      const result = await PoolLength.save([shortPool, longPool]);
      if (result?.length) return 'Successfully generated new pool lengths';
    } catch (e) {
      return 'Error occurred when trying to add pool lengths';
    }
  }

  async generateSwimmingStyles(): Promise<string> {
    try {
      const backstroke = new SwimmingStyle('backstroke');
      const frontCrawl = new SwimmingStyle('front crawl');
      const breaststroke = new SwimmingStyle('breaststroke');
      const butterfly = new SwimmingStyle('butterfly');

      const result = await SwimmingStyle.save([
        backstroke,
        frontCrawl,
        breaststroke,
        butterfly,
      ]);
      if (result?.length) return 'Successfully generated new swimming styles';
    } catch (e) {
      return 'Error occurred when trying to add swimming styles';
    }
  }
}
