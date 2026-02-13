import { EventBus } from "./EventBus";
import { ScoreSystem } from "./ScoreSystem";
import { DifficultySystem } from "./DifficultySystem";
import { AntiCheat } from "./AntiCheat";
import { Ball } from "./Ball";
import { BossBall } from "./BossBall";

export class GameEngine {
  private entities: Map<string, Ball> = new Map();
  private running = false;
  private loopId: number | null = null;

  public scoreSystem = new ScoreSystem();
  public difficulty = new DifficultySystem();
  public antiCheat = new AntiCheat();
  public events = new EventBus();

  public lives = 5;

  constructor() {}

  start() {
    this.running = true;
    this.spawnLoop();
    this.gameLoop();
  }

  stop() {
    this.running = false;
    if (this.loopId) cancelAnimationFrame(this.loopId);
  }

  private spawnLoop() {
    setInterval(() => {
      if (!this.running) return;

      const level = this.difficulty.level;

      if (level % 10 === 0) {
        this.spawnBoss();
      } else {
        this.spawnBall();
      }
    }, this.difficulty.getSpawnRate());
  }

  private spawnBall() {
    const ball = new Ball(this.difficulty.getSpeed());
    this.entities.set(ball.id, ball);
    this.events.emit("spawn", ball);
  }

  private spawnBoss() {
    const boss = new BossBall(this.difficulty.getSpeed());
    this.entities.set(boss.id, boss);
    this.events.emit("spawn", boss);
  }

  private gameLoop = () => {
    if (!this.running) return;

    this.entities.forEach((entity) => {
      entity.update();

      if (entity.reachedTarget()) {
        this.handleMiss(entity.id);
      }
    });

    this.loopId = requestAnimationFrame(this.gameLoop);
  };

  hit(id: string) {
    if (!this.antiCheat.validateClick()) return;

    const entity = this.entities.get(id);
    if (!entity) return;

    const points = entity.getPoints();
    this.scoreSystem.registerHit(points);
    this.difficulty.increaseProgress();

    this.entities.delete(id);
    this.events.emit("hit", entity);
  }

  private handleMiss(id: string) {
    this.entities.delete(id);
    this.scoreSystem.resetCombo();
    this.lives -= 1;

    this.events.emit("miss", id);

    if (this.lives <= 0) {
      this.endGame();
    }
  }

  private endGame() {
    this.running = false;
    this.events.emit("gameOver", {
      finalScore: this.scoreSystem.getTournamentScore(
        this.difficulty.level
      ),
    });
  }
}
