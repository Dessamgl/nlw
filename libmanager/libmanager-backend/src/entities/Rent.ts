import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { v4 as uuidV4 } from 'uuid';
  
  @Entity('rent_books')
  export class Rent {
    @PrimaryColumn()
    id: string;
  
    @Column()
    user_id: string;

    @Column()
    book_id: string;
  
    @Column()
    rent_initial: Date;

    @Column()
    rent_final: Date;
  
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
  