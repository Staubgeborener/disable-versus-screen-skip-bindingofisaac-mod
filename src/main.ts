import { ModCallback, RoomType } from "isaac-typescript-definitions";
import {
  game,
  ISCFeature,
  ModCallbackCustom,
  upgradeMod,
} from "isaacscript-common";

const MOD_NAME = "disable-versus-screen-skip";
const modVanilla = RegisterMod(MOD_NAME, 1);
const features = [ISCFeature.DISABLE_INPUTS] as const;
export const mod = upgradeMod(modVanilla, features);

main();

function main() {
  mod.AddCallbackCustom(ModCallbackCustom.POST_NEW_ROOM_EARLY, () => {
    if (game.GetRoom().GetType() === RoomType.BOSS) {
      mod.disableAllInputs("disable-versus-screen-skip-key-input");
    }
  });

  mod.AddCallback(ModCallback.POST_UPDATE, () => {
    if (game.GetRoom().GetType() === RoomType.BOSS) {
      if (game.GetRoom().GetFrameCount() > 1) {
        mod.enableAllInputs("disable-versus-screen-skip-key-input");
      }
    }
  });
}
