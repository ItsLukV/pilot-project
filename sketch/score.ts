class Score {
  score: number;
  highScore: number;
  constructor() {
    this.highScore = 0;
    this.score = 0;
  }

  private tick() {
    if (this.score > this.highScore) this.highScore = this.score;
  }

  public save() {
    localStorage.setItem("Score", JSON.stringify(this.highScore));
  }

  public load() {
    let hs = JSON.parse(localStorage.getItem("Score"));
    if (hs === null) this.highScore = 0;
    else this.highScore = JSON.parse(localStorage.getItem("Score"));
  }

  public show() {
    this.tick();
    push();
    textSize(40);
    this.score = this.countPoints();
    fill(255, 220);
    let scoreTxt = `Score: ${this.score}`;
    rect(0, 0, textWidth(scoreTxt) + 20, 40 + 10);
    fill(0);
    text(scoreTxt, 0 + 10, 40);

    fill(255, 220);
    let highTxt = `HighScore: ${this.highScore}`;
    rect(width - textWidth(highTxt) - 20, 0, textWidth(highTxt) + 20, 40 + 10);

    fill(0);
    text(highTxt, width - textWidth(highTxt) - 10, 40);
    pop();
  }

  private countPoints(): number {
    let sum: number = 0;
    hook.hooked.forEach((item) => {
      sum += item.points;
    });
    return sum;
  }
}
