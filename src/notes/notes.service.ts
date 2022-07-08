import { Injectable } from '@nestjs/common';
import { Note } from 'src/entities/note.entity';
import { WorkoutSessionsService } from 'src/workout-sessions/workout-sessions.service';

@Injectable()
export class NotesService {
  constructor(private workoutSessionsService: WorkoutSessionsService) {}

  async createNote(text: string, workoutSessionId: string) {
    const workoutSession =
      await this.workoutSessionsService.getWorkoutSessionById(workoutSessionId);
    const note = new Note(text, workoutSession);
    if (!note) return `Couldn't create a note.`;
    return await Note.save(note);
  }

  async deleteNote(noteId: string) {
    const note = await this.getNoteByNoteId(noteId);
    if (!note) return `Couldn't find a note.`;
    await Note.remove(note);
    return 'Note removed';
  }

  async updateNote(newText: string, noteId: string) {
    const note = await this.getNoteByNoteId(noteId);
    if (!note) return `Couldn't find a note.`;

    note.note = newText;
    return Note.save(note);
  }

  async getNoteByNoteId(noteId: string) {
    return await Note.findOne({
      relations: ['workoutSession'],
      where: { id: noteId },
    });
  }

  async getAllNotesForWorkoutSession(workoutSessionId: string) {
    const workoutSession =
      await this.workoutSessionsService.getWorkoutSessionById(workoutSessionId);
    return await Note.find({
      relations: ['workoutSession'],
      where: { workoutSession: workoutSession },
    });
  }
}
