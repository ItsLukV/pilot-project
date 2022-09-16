class OpenKnap {
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
    if (mouseX > this.x && mouseX < this.x + this.w) {
      if (mouseY > this.y && mouseY < this.y + this.h) {
        playState = playStateList.tutoriale;
      }
    }
  }
  hover() {
    if (mouseX > this.x && mouseX < this.x + this.w) {
      if (mouseY > this.y && mouseY < this.y + this.h) {
        image(startImg[4], 0, 0);
      }
    }
  }
}
