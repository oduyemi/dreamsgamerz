export abstract class Entity {
    public id: string;
    protected speed: number;
    protected progress = 0;
  
    constructor(speed: number) {
      this.id = crypto.randomUUID();
      this.speed = speed;
    }
  
    update() {
      this.progress += this.speed * 0.01;
    }
  
    reachedTarget() {
      return this.progress >= 1;
    }
  
    abstract getPoints(): number;
  }
  