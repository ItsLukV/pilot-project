class TutorialeKnap {
  x: number;
  y: number;
  w: number;
  h: number;
  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  hitbox() {
    rect(this.x, this.y, this.w, this.h);
    if (mouseX > this.x && mouseX < this.x + this.w) {
      if (mouseY > this.y && mouseY < this.y + this.h) {
        playState = playStateList.tutoriale;
      }
    }
  }
}
