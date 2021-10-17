import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Server } from "./Server";
import { ServerUser } from "./ServerUser";

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

  @ManyToOne(() => ServerUser, (su) => su.messages, {
    onDelete: "CASCADE",
  })
  author!: ServerUser;

  @ManyToOne(() => Server, (server) => server.messages, { onDelete: "CASCADE" })
  @JoinColumn()
  server!: Server;
}
