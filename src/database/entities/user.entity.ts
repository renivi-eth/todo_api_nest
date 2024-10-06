import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Task } from './task.entity';
import { Tag } from './tag.entity';

@Entity('user')
export class User {
  // id
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // email max 256 unique / not null
  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
    nullable: false,
  })
  email: string;

  // password
  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  // created_at
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // updated_at
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // Один пользователь может иметь много задач
  @OneToMany(() => Task, (task) => task.user_id)
  tasks: Task[];

  // Один пользователь можем иметь много тэгов
  @OneToMany(() => Tag, (tag) => tag.user_id)
  tags: Tag[];
}
