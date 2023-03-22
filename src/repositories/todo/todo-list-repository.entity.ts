import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'todo_list' })
export class TodoList extends BaseEntity {
  @Column('bigint')
  public id!: number;

  @PrimaryColumn('uuid', { name: 'user_id' })
  public userId: string;

  @PrimaryColumn('uuid', { name: 'todo_id' })
  public todoId: string;

  @Column('int8', { name: 'seq_no' })
  public seqNo: number;

  @Column('text')
  public content: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'now()',
    name: 'created_at',
  })
  public createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'now()',
    name: 'updated_at',
  })
  public updatedAt?: Date;
}
