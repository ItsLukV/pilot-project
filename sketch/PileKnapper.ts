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

  clicked(func: Function) {
    if (playState != playStateList.tutoriale) return;
    if (mouseX > this.x && mouseX < this.x + this.w) {
      if (mouseY > this.y && mouseY < this.y + this.h) {
        func();
      }
    }
  }

  hover(): boolean {
    if (mouseX > this.x && mouseX < this.x + this.w) {
      if (mouseY > this.y && mouseY < this.y + this.h) {
        return true;
      }
      return false;
    }
    return false;
  }
}
