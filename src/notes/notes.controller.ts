import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/auth/utils/roles.enum';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createNote(
    @Body() body: { text: string; workoutSessionId: string },
    @Res() res: Response,
  ) {
    const result = await this.notesService.createNote(
      body.text,
      body.workoutSessionId,
    );
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Delete()
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteNote(@Query('noteId') noteId: string, @Res() res: Response) {
    const result = await this.notesService.deleteNote(noteId);
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Patch()
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateNote(
    @Body() body: { text: string; noteId: string },
    @Res() res: Response,
  ) {
    const result = await this.notesService.updateNote(body.text, body.noteId);
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Get()
  @Roles(Role.COACH, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getNotesByWorkoutSessionId(
    @Query() query: { workoutSessionId: string },
    @Res() res: Response,
  ) {
    const result = await this.notesService.getAllNotesForWorkoutSession(
      query.workoutSessionId,
    );
    res.status(result.status).send({ message: result.message, ...result.data });
  }
}
