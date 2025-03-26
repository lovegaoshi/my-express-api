import express, { Router, Request, Response } from "express";
import serverless from "serverless-http";

import getPlayer from "../../src/ytb";

const api = express();

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const playerURL = req.query ? String(req.query.playerURL) : undefined;
    console.log(`[findFunction] parsing ${playerURL}`);
    res.set({
      "Netlify-Vary": "query",
      "Really-Cool": "I know",
    });
    return res.end(await getPlayer(playerURL));
  } catch {
    return res.status(500);
  }
});

api.use("/api/", router);

export const handler = serverless(api);
