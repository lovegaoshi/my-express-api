import express, { Express, Request, Response } from "express";
import ytbiRouter from "./routes/ytbi.js";
const app: Express = express();
const port = 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Merry Christmas 🎄🎅");
});

app.use("/api", ytbiRouter);

const server = app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});

server.setTimeout(8000);

export default app;
