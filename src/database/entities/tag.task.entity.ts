import { Tag } from './tag.entity';
import { Task } from './task.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('task_tag')
export class TaskTag {
  // task-id
  @PrimaryColumn({ type: 'uuid' })
  task_id: string;

  // tag_id
  @PrimaryColumn({ type: 'uuid' })
  tag_id: string;

  // Много связей к одной задаче или тэгу
  @ManyToOne(() => Task, (task) => task.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => Tag, (tag) => tag.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
