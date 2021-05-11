import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Server } from "./Server";
import { User } from "./User";

@Entity("server_users")
@ObjectType()
export class ServerUser extends BaseEntity {
  @PrimaryColumn()
  @Field()
  userId: string;

  @PrimaryColumn()
  @Field()
  serverId: string;

  @ManyToOne(() => User, (user) => user.servers, { primary: true })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @ManyToOne(() => Server, (server) => server.users, { primary: true })
  @JoinColumn({ name: "serverId" })
  server: Promise<Server>;
}
