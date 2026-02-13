export class DifficultySystem {
    public level = 1;
    private progress = 0;
  
    increaseProgress() {
      this.progress++;
      if (this.progress % 5 === 0) {
        this.level++;
      }
    }
  
    getSpeed() {
      return Math.min(0.02 + this.level * 0.002, 0.1);
    }
  
    getSpawnRate() {
      return Math.max(2000 - this.level * 120, 400);
    }
  }
  