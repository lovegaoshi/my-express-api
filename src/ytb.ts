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
  const newPlayer = await Player.create2(fakeCache);
  // @ts-expect-error
  store.setState({ playerURL: newPlayer.player_id, cachedPlayer: cachedVal });
  console.log(`[getPlayer] Player created for ${newPlayer.player_id}`);
  return cachedVal;
};

export default getPlayer;
