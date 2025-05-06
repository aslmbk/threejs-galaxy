import { Engine } from "./Engine";
import { DebugController } from "./DebugController";
import { Config } from "./Config";

export class Experience extends Engine {
  public readonly config: Config;
  public readonly debugController: DebugController;

  constructor(domElement: HTMLElement) {
    super({ domElement });
    this.config = new Config();
    this.debugController = new DebugController(this);
    this.stats.activate();
  }
}
