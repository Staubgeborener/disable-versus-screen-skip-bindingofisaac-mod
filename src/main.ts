import { ModCallback, RoomType } from "isaac-typescript-definitions";
import { ISCFeature, upgradeMod } from "isaacscript-common";

const MOD_NAME = "disable-versus-screen-skip";
const modVanilla = RegisterMod(MOD_NAME, 1);
const features = [ISCFeature.DISABLE_INPUTS] as const;
export const mod = upgradeMod(modVanilla, features);

main();

function main() {
  mod.AddCallback(ModCallback.POST_UPDATE, () => {
    const roomData = Game().GetRoom().GetType();
    if (roomData === RoomType.BOSS) {
      const frameCount = Game().GetRoom().GetFrameCount();
      if (frameCount < 1) {
        mod.disableAllInputs("h34984h0fv");
      } else {
        mod.enableAllInputs("h34984h0fv");
      }
    }
  });

  // Just to check the current frame.
  mod.AddCallback(ModCallback.POST_RENDER, () => {
    const frameCountY = Game().GetRoom().GetFrameCount();
    const frameCountX = `${frameCountY}`;
    Isaac.RenderText(frameCountX, 50, 50, 0.5, 0.5, 1, 1);
  });
}
