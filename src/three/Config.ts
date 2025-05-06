import type { GalaxyParams } from "./Galaxy";

export class Config {
  public clearColor = "#222533";

  public galaxyParams: GalaxyParams = {
    count: 20000,
    size: 0.02,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
  };
}
