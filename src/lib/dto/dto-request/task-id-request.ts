import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class TaskIdParam {
  @ApiProperty({ description: 'task ID' })
  @IsUUID()
  taskId: string;
}
