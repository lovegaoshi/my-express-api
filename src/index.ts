import fs from "fs";
import getPlayer from "./ytbi/store";

getPlayer("getNew").then((data) => {
  fs.writeFile(
    `./cachedPlayers/${data.id}`,
    Buffer.from(data.data),
    () => undefined
  );
  fs.writeFile(`./cachedPlayers/latest`, data.id, () => undefined);
});
