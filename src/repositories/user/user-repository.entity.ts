import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryColumn('bigint')
  public id!: number;

  @Column('uuid', { name: 'user_id' })
  public userId: string;

  @Column('varchar')
  public name: string;

  @Column('varchar')
  public email: string;

  @Column('bigint', { name: 'mobile_no' })
  public mobileNo: number;

  @Column('varchar')
  public avatar: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
    name: 'created_at',
  })
  public createdAt?: Date;
}
