import { ModCallback } from "isaac-typescript-definitions";
import { ISCFeature, upgradeMod } from "isaacscript-common";

const MOD_NAME = "disable-versus-screen-skip";
const modVanilla = RegisterMod(MOD_NAME, 1);
const features = [ISCFeature.DISABLE_INPUTS] as const;
export const mod = upgradeMod(modVanilla, features);

main();

function main() {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events.

  // Register a callback function that corresponds to when a new run is started.
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted);

  // Print a message to the "log.txt" file.
  Isaac.DebugString(`${MOD_NAME} initialized.`);

  mod.AddCallback(ModCallback.POST_UPDATE, () => {
    disableAllInputs();
  });
}

function postGameStarted() {
  Isaac.DebugString("Callback fired: POST_GAME_STARTED");
}
