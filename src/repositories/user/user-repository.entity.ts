import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
} from "typeorm";


@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryColumn("bigint")
  public id!: number;

  @Column("uuid")
  public user_id: number;

  @Column("varchar")
  public name: string;

  @Column("varchar")
  public email: string;

  @Column("bigint")
  public mobile_no: number;

  @CreateDateColumn({
    type: "timestamp without time zone",
    default: () => "now()",
  })
  public created_at?: Date;
}
