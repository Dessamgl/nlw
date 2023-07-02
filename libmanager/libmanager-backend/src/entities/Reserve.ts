import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Book } from './Book';
import { User } from './User';

@Entity('reserves_books')
export class Reserve {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  book_id: string;

  @Column()
  reserve_limit_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
