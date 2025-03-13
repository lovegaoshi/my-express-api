import { Request, Response, Router } from "express";
import getPlayer from "../ytbi/store.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  console.log(JSON.stringify(req.headers));
  try {
    const { playerURL } = req.body;
    console.log(`[findFunction] parsing ${playerURL}`);
    return res.send(await getPlayer(playerURL));
  } catch {
    return res.status(500);
  }
});

export default router;
