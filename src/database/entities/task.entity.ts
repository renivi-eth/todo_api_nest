import { User } from './user.entity';
import { TaskState } from '../../lib/variables/task-state';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('task')
export class Task {
  // id
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   name
  @Column({ type: 'varchar', length: 30 })
  name: string;

  // description
  @Column({ type: 'text', nullable: true })
  description?: string;

  // task state (enum)
  @Column({
    type: 'enum',
    enum: TaskState,
    default: TaskState.BACKLOG,
  })
  state: TaskState;

  // user_id FOREIGN KEY for User
  @Column({
    type: 'uuid',
  })
  user_id: string;

  // created_at
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // updated_at
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // Много задач должны относится к одному пользователю
  @ManyToOne(() => User, (user) => user.tags, { onDelete: 'CASCADE' })
  // Внешний ключ для связи сущности с пользователем, referencecColumnName - колонка id в user это ключ для user_id в task.
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
