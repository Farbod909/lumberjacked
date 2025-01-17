import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateMovmenentDto } from './dto/update-movement.dto';
import { CreateMovementDto } from './dto/create-movement.dto';

@Injectable()
export class MovementsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createMovementDto: CreateMovementDto, authorId: number) {
    return this.databaseService.movement.create({
      data: {
        authorId,
        ...createMovementDto,
      },
    });
  }

  findAll(authorId: number) {
    return this.databaseService.movement.findMany({
      where: {
        authorId,
      },
      select: {
        id: true,
        name: true,
        category: true,
        repRange: true,
        createdAt: true,
        movementLogs: {
          orderBy: {
            timestamp: 'desc',
          },
          take: 2,
          select: { sets: true, reps: true, load: true, timestamp: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.databaseService.movement.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        authorId: true,
        name: true,
        category: true,
        notes: true,
        warmupSets: true,
        workingSets: true,
        repRange: true,
        rpe: true,
        restTime: true,
        createdAt: true,
        updatedAt: true,
        movementLogs: {
          select: {
            id: true,
            sets: true,
            reps: true,
            load: true,
            notes: true,
            timestamp: true,
          },
        },
      },
    });
  }

  update(id: number, updateMovementDto: UpdateMovmenentDto) {
    return this.databaseService.movement.update({
      where: { id },
      data: updateMovementDto,
    });
  }

  remove(id: number) {
    return this.databaseService.movement.delete({
      where: { id },
    });
  }
}
