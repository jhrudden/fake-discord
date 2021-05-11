import "dotenv/config";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { User } from "../entity/User";

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

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("sid", token, { httpOnly: true });
};

export async function refreshToken(req: Request, res: Response) {
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

  const user = await User.findOne({
    where: {
      id: payload.userId,
    },
    select: ["id", "email", "tokenVersion"],
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
