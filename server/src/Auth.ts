import { PrismaClient } from ".prisma/client";
import "dotenv/config";
import { Response } from "express";
import { sign } from "jsonwebtoken";

export const createAccessToken = (id: string) => {
  return sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (id: string, tokenVersion: number) => {
  return sign(
    { userId: id, tokenVersion: tokenVersion },
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

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("sid", token, { httpOnly: true });
};
