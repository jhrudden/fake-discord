import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity("server-invites")
@ObjectType()
export class ServerInvite extends BaseEntity {
  @PrimaryColumn()
  @Field()
  url!: string;

  @CreateDateColumn({ type: "timestamptz" })
  @Field()
  created_at: Date;

  @Column()
  @Field()
  serverId!: string;
}
