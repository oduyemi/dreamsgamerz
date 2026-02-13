import { Entity } from "./Entity";

export class BossBall extends Entity {
  private health = 3;

  update() {
    this.progress += this.speed * 0.006;
  }

  getPoints() {
    return 100;
  }

  takeDamage() {
    this.health--;
    return this.health <= 0;
  }
}
