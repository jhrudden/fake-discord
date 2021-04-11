import { PrismaClient } from ".prisma/client";
import "dotenv/config";
import { sign } from "jsonwebtoken";
import User from "./entity/User";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};

export const revokeRefreshToken = async (
  userId: string,
  prisma: PrismaClient
) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      tokenVersion: {
        increment: 1,
      },
    },
  });
  return true;
};
