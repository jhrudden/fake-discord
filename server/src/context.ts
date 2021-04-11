import { Request, Response } from "express";
import { PrismaClient } from ".prisma/client";

export interface Context {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  payload?: { userId: string };
}
