export class ScoreSystem {
    private score = 0;
    private combo = 0;
    private multiplier = 1;
    private maxCombo = 0;
  
    registerHit(basePoints: number) {
      this.combo++;
      this.multiplier = 1 + Math.floor(this.combo / 5);
      this.score += basePoints * this.multiplier;
      this.maxCombo = Math.max(this.maxCombo, this.combo);
    }
  
    resetCombo() {
      this.combo = 0;
      this.multiplier = 1;
    }
  
    getScore() {
      return this.score;
    }
  
    getTournamentScore(level: number) {
      return this.score + level * 50 + this.maxCombo * 10;
    }
  }
  