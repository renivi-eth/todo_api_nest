import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('tag')
export class Tag {
  // id
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   name
  @Column({ type: 'varchar', length: 50 })
  name: string;

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

  // Много тэгов должны относится к одному пользователю
  @ManyToOne(() => User, (user) => user.tags, { onDelete: 'CASCADE' })
  // Внешний ключ для связи сущности с пользователем, referencecColumnName - колонка id в user это ключ для user_id в tag.
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
