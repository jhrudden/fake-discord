import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./Message";
import { ServerUser } from "./ServerUser";

@Entity("servers")
@ObjectType()
export class Server extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  serverName!: string;

  @OneToMany(() => ServerUser, (su) => su.user)
  users: ServerUser[];

  @OneToMany(() => Message, (ms) => ms.server)
  messages: Message[];
}
