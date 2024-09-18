import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskState } from '../variables/task-state';
import { User } from './user.entity';
import { Tag } from './tag.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: TaskState,
    default: TaskState.BACKLOG,
  })
  state: TaskState;

  @Column({
    type: 'uuid',
  })
  user_id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // Много задач должны относится к одному пользователю
  @ManyToOne(() => User, (user) => user.tags, { onDelete: 'CASCADE' })
  // TODO: описать почему
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
