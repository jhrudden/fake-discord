import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { createAccessToken, sendRefreshToken } from "../Auth";

export async function refreshToken(
  req: Request,
  res: Response,
  prisma: PrismaClient
) {
  const token = req.cookies.sid;

  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload: any = null;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  // token is valid so send back accessToken

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, tokenVersion: true },
  });

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, token);

  return res.send({
    ok: true,
    accessToken: createAccessToken(user.id),
  });
}
