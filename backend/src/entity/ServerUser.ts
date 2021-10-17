import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./Message";
import { Server } from "./Server";
import { User } from "./User";

@Entity("server_users")
@ObjectType()
export class ServerUser extends BaseEntity {
  // NOTE: typeorm doesn't support creating ManyToOne relationships with tables with composite keys
  // this key is redundant, since we will be using userId and serverId to find this table.
  @PrimaryGeneratedColumn("uuid")
  serverUserId: string;

  @Column()
  @Field()
  userId!: string;

  @Column()
  @Field()
  serverId!: string;

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Server, (server) => server.id, { onDelete: "CASCADE" })
  server: Server;
}
