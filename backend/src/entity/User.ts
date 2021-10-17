import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ServerUser } from "./ServerUser";

@Entity("users")
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  username!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  @Field()
  password!: string;

  @Column({ default: 1 })
  @Field(() => Int)
  tokenVersion: number;

  @OneToMany(() => ServerUser, (su) => su.server)
  servers: ServerUser[];
}
