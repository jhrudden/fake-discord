import { Server } from "../entity/Server";
import { ServerInvite } from "../entity/ServerInvite";
import { isAuth } from "../middlewares/isAuth";
import { createShortURL } from "../services/urls";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

// invites should be valid for 3 minutes
const INVITE_DURATION = 1000 * 60 * 3;

@Resolver()
export class InviteResolver {
  @Query(() => ServerInvite, { nullable: true })
  @UseMiddleware(isAuth)
  async getValidInvite(@Arg("inviteUrl") inviteUrl: string) {
    try {
      const invite = await ServerInvite.findOne({ where: { url: inviteUrl } });
      if (!invite) return null;

      // get the end time for this invites duration
      const endTime = invite.created_at.getTime() + INVITE_DURATION;
      // check if invite has expired
      console.log(endTime);
      console.log(Date.now());
      if (endTime < Date.now()) {
        await invite.remove();
        return null;
      }
      return invite;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async killInvite(@Arg("inviteUrl") inviteUrl: string) {
    try {
      const invite = await ServerInvite.findOne({ where: { url: inviteUrl } });
      if (invite) {
        await invite.remove();
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }

  @Mutation(() => ServerInvite, { nullable: true })
  @UseMiddleware(isAuth)
  async createServerInvite(@Arg("serverId") serverId: string) {
    try {
      const server = await Server.find({ where: { id: serverId } });
      if (server) {
        const url = createShortURL();
        const invite = new ServerInvite();
        invite.url = url;
        invite.serverId = serverId;
        await invite.save();
        return invite;
      }

      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
