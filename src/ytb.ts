import { Player } from "youtubei.js";
import { ICache } from "youtubei.js/dist/src/types";

let cachedVal: ArrayBuffer;

const fakeCache: ICache = {
  cache_dir: "",
  get: async () => undefined,
  set: async (k, v) => {
    cachedVal = v;
  },
  remove: async () => undefined,
};

const getPlayer = async (newPlayerURL?: string) => {
  const newPlayer = await (newPlayerURL
    ? Player.create_from_id(fakeCache, newPlayerURL)
    : Player.create(fakeCache));
  console.log(`[getPlayer] Player created for ${newPlayer.player_id}`);
  if (cachedVal === undefined) {
    throw new Error("[getPlayer] player was not parsed in the end");
  }
  return cachedVal;
};

export default getPlayer;
