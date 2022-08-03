import { Injectable } from '@nestjs/common';
import { Note } from 'src/entities/note.entity';
import { MyResponse } from 'src/shared_dto/response';
import { WorkoutSessionsService } from 'src/workout-sessions/workout-sessions.service';
import { serverErrorResponse } from 'src/shared_dto/error';

@Injectable()
export class NotesService {
  constructor(private workoutSessionsService: WorkoutSessionsService) {}

  async createNote(
    text: string,
    workoutSessionId: string,
  ): Promise<MyResponse> {
    try {
      const workoutSession =
        await this.workoutSessionsService.getWorkoutSessionById(
          workoutSessionId,
        );
      const note = new Note(text, workoutSession);
      if (!note)
        return {
          status: 400,
          message: `Couldn't create a note.`,
        };
      const result = await Note.save(note);
      return {
        status: 201,
        message: `Note created.`,
        data: result,
      };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  async deleteNote(noteId: string): Promise<MyResponse> {
    try {
      const note = await this.getNoteByNoteId(noteId);
      if (!note)
        return {
          status: 400,
          message: `Couldn't find a note.`,
        };
      await Note.remove(note);
      return {
        status: 200,
        message: 'Note removed',
      };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  async updateNote(newText: string, noteId: string): Promise<MyResponse> {
    try {
      const note = await this.getNoteByNoteId(noteId);
      if (!note)
        return {
          status: 400,
          message: `Couldn't find a note.`,
        };

      note.note = newText;
      const result = await Note.save(note);
      return { status: 201, message: 'Note updated', data: { note: result } };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  async getAllNotesForWorkoutSession(
    workoutSessionId: string,
  ): Promise<MyResponse> {
    try {
      const workoutSession =
        await this.workoutSessionsService.getWorkoutSessionById(
          workoutSessionId,
        );
      const notes = await Note.find({
        relations: ['workoutSession'],
        where: { workoutSession: workoutSession },
      });
      return { status: 200, message: 'Success', data: { notes } };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  async getNoteByNoteId(noteId: string) {
    try {
      return await Note.findOne({
        relations: ['workoutSession'],
        where: { id: noteId },
      });
    } catch (error) {
      return null;
    }
  }
}
