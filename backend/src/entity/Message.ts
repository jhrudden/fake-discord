import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ServerUser } from "./ServerUser";
import { Server } from "./Server";

@Entity("messages")
@ObjectType()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  messageId: string;

  @CreateDateColumn()
  @Field()
  datePosted: Date;

  @Column()
  @Field()
  content: string;

  @OneToOne(() => ServerUser)
  @JoinColumn()
  @Field()
  author: ServerUser;

  @ManyToOne(() => Server, (server) => server.messages, { onDelete: "CASCADE" })
  @JoinColumn()
  server: Server;
}
