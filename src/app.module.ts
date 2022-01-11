import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { UsersCoachesModule } from './users-coaches/users-coaches.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { GendersModule } from './genders/genders.module';
import { WorkoutSessionsModule } from './workout-sessions/workout-sessions.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { NotesModule } from './notes/notes.module';
import { WorkoutTypesModule } from './workout-types/workout-types.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    UserRolesModule,
    UsersCoachesModule,
    UserDetailsModule,
    GendersModule,
    WorkoutSessionsModule,
    WorkoutsModule,
    NotesModule,
    WorkoutTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
