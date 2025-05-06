import { toneMappingOptions } from "./Engine/utils/constants";
import { colorSpaceOptions } from "./Engine/utils/constants";
import { shadowMapTypeOptions } from "./Engine/utils/constants";
import { Experience } from "./Experience";

export class DebugController {
  private experience: Experience;

  constructor(experience: Experience) {
    this.experience = experience;

    this.addRendererFolder();
    this.addGalaxyFolder();
  }

  private addRendererFolder() {
    const rendererFolder = this.experience.debug.addFolder({
      title: "renderer",
      expanded: false,
    });

    rendererFolder.addBinding(this.experience.renderer, "toneMapping", {
      label: "tone mapping",
      options: toneMappingOptions,
    });

    rendererFolder.addBinding(this.experience.renderer, "toneMappingExposure", {
      label: "tone mapping exposure",
      min: 0,
      max: 10,
      step: 0.1,
    });

    rendererFolder.addBinding(this.experience.renderer, "outputColorSpace", {
      label: "color space",
      options: colorSpaceOptions,
    });

    rendererFolder.addBinding(this.experience.renderer.shadowMap, "type", {
      label: "shadow map type",
      options: shadowMapTypeOptions,
    });
  }

  private addGalaxyFolder() {
    const galaxyFolder = this.experience.debug
      .addFolder({
        title: "galaxy",
        expanded: false,
      })
      .on("change", () => {
        this.experience.galaxy.generate(this.experience.config.galaxyParams);
      });

    galaxyFolder.addBinding(this.experience.config.galaxyParams, "count", {
      label: "count",
      min: 0,
      max: 100000,
      step: 1000,
    });

    galaxyFolder.addBinding(this.experience.config.galaxyParams, "size", {
      label: "size",
      min: 0,
      max: 1,
      step: 0.01,
    });

    galaxyFolder.addBinding(this.experience.config.galaxyParams, "radius", {
      label: "radius",
      min: 0,
      max: 10,
      step: 0.1,
    });

    galaxyFolder.addBinding(this.experience.config.galaxyParams, "branches", {
      label: "branches",
      min: 0,
      max: 10,
      step: 1,
    });

    galaxyFolder.addBinding(this.experience.config.galaxyParams, "spin", {
      label: "spin",
      min: -5,
      max: 5,
      step: 0.01,
    });

    galaxyFolder.addBinding(this.experience.config.galaxyParams, "randomness", {
      label: "randomness",
      min: 0,
      max: 1,
      step: 0.01,
    });

    galaxyFolder.addBinding(
      this.experience.config.galaxyParams,
      "randomnessPower",
      {
        label: "randomness power",
        min: 0,
        max: 10,
        step: 0.1,
      }
    );

    galaxyFolder.addBinding(
      this.experience.config.galaxyParams,
      "insideColor",
      {
        label: "inside color",
        type: "color",
      }
    );

    galaxyFolder.addBinding(
      this.experience.config.galaxyParams,
      "outsideColor",
      {
        label: "outside color",
        type: "color",
      }
    );
  }
}
