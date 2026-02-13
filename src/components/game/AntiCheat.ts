export class AntiCheat {
    private lastClick = 0;
  
    validateClick() {
      const now = Date.now();
      if (now - this.lastClick < 120) return false;
      this.lastClick = now;
      return true;
    }
  }
  