import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('books')
export class Book {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  isbn: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
