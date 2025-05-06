import { Engine } from "./Engine";
import { DebugController } from "./DebugController";
import { Config } from "./Config";
import { Galaxy } from "./Galaxy";

export class Experience extends Engine {
  public readonly config: Config;
  public readonly debugController: DebugController;

  public readonly galaxy: Galaxy;

  constructor(domElement: HTMLElement) {
    super({ domElement });
    this.config = new Config();
    this.debugController = new DebugController(this);
    this.stats.activate();

    this.camera.position.set(6, 6, 6);

    this.galaxy = new Galaxy(this.config.galaxyParams);

    this.scene.add(this.galaxy.points);
  }
}
