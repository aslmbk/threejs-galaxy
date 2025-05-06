import * as THREE from "three";

export type GalaxyParams = {
  count: number;
  size: number;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  insideColor: string;
  outsideColor: string;
};

export class Galaxy {
  private params!: GalaxyParams;
  private geometry = new THREE.BufferGeometry();
  private material = new THREE.PointsMaterial({
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  public points: THREE.Points;

  constructor(params: GalaxyParams) {
    this.generate(params);

    this.points = new THREE.Points(this.geometry, this.material);
  }

  private updateGeometry() {
    const positions = new Float32Array(this.params.count * 3);
    const colors = new Float32Array(this.params.count * 3);

    const insideColor = new THREE.Color(this.params.insideColor);
    const outsideColor = new THREE.Color(this.params.outsideColor);

    for (let i = 0; i < this.params.count; i++) {
      const i3 = i * 3;

      const radius = Math.random() * this.params.radius;
      const spinAngle = radius * this.params.spin;
      const branchAngle =
        ((i % this.params.branches) / this.params.branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), this.params.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        this.params.randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), this.params.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        this.params.randomness *
        radius;
      const randomZ =
        Math.pow(Math.random(), this.params.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        this.params.randomness *
        radius;

      positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = insideColor
        .clone()
        .lerp(outsideColor, radius / this.params.radius);

      colors[i3 + 0] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  }

  public generate(params: GalaxyParams) {
    this.params = params;

    this.updateGeometry();

    this.material.size = params.size;
  }
}
