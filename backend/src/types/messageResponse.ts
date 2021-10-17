import { User } from "../entity/User";
import { Field, ObjectType } from "type-graphql";
import { Message } from "../entity/Message";

@ObjectType()
export class MessageResponse {
    @Field()
    message: Message;
    @Field()
    author: User;
}
