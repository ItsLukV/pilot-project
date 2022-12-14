declare function loadSound(path: string): p5.SoundFile;
window.addEventListener("unload", function (event) {
  score.save();
});
let offset: number = -250;
let tutorialeScreen: boolean = false;

let hook: Krog;
let skrald: Skrald[] = [];
let fisk: Fisk[] = [];
let deadFisk: DeadFisk[] = [];

let tutorialeImg: p5.Image[] = [];
let pressSpace: p5.Image;
let fishermanImg: p5.Image;
let krogImg: p5.Image;
let skraldImg: p5.Image[] = [];
let backgroundImg: p5.Image;
let fiskImg: Array<p5.Image>[] = [];
let deadFiskImg: p5.Image[] = [];
let mySound: p5.SoundFile;

// Animation
let startImg: p5.Image[] = [];
let maxFrame1: number = 7.6 * 60;
let maxFrame2: number = 2.2 * 60;
let maxFrame3: number = 2.2 * 60;
let currentFrame: number = 0;

let score: Score;

enum playStateList {
  menu = 0,
  play = 1,
  startLoading = 2,
  gameLoading = 3,
  tutoriale = 4,
  restartLoading = 5,
}
let playState: playStateList = playStateList.startLoading;

let playKnap: PlayKnap;
let tutorialeKnap: OpenKnap;
let tutorialeVenstre: TutorialeKnap;
let tutorialeHøjre: TutorialeKnap;
let tutorialeLuk: TutorialeKnap;

const hookLevel: number = 400;
const skraldAntal: number = 50;
const fiskAntal: number = 30;
const deadAntal: number = 30;
const hitboxShow: boolean = false;

function preload() {
  loadSprites();
}
function setup() {
  createCanvas(640, 800);
  setupTrash();
  score = new Score();
  score.load();
  tutorialeVenstre = new TutorialeKnap(69, 692, 64, 35);
  tutorialeHøjre = new TutorialeKnap(524, 698, 63, 34);
  tutorialeLuk = new TutorialeKnap(601, 0, 39, 46);

  playKnap = new PlayKnap(243, 294, 176, 84);
  tutorialeKnap = new OpenKnap(36, 526, 58, 60);
  hook = new Krog(krogImg, 640 / 2, hookLevel);
}

function draw() {
  if (tutoriale()) return;
  if (animation()) return;

  checkHook();
  image(backgroundImg, 0, 0 + offset);

  image(fishermanImg, 290, 450 + offset);

  image(pressSpace, 321 - 250 / 2, 350 + offset, 250, 100);
  waterItemsTick();

  hook.tick();
  hook.show();

  for (let i = 0; i < hook.hooked.length; i++) {
    hook.hooked[i].tick();
    hook.hooked[i].show();
  }
  score.show();
}

function mousePressed() {
  playKnap.clicked();
  tutorialeKnap.hitbox();

  tutorialeVenstre.clicked(() => {
    tutorialeScreen = false;
  });
  tutorialeHøjre.clicked(() => {
    tutorialeScreen = true;
  });
  tutorialeLuk.clicked(() => {
    playState = playStateList.menu;
    tutorialeScreen = false;
  });

  //TODO remove
  console.log("NON-offset", mouseX, mouseY);
  console.log("offset", mouseX, mouseY - offset);
}

function keyPressed() {
  if (playState === playStateList.play)
    if (keyCode === 32) {
      skrald = [];
      deadFisk = [];
      fisk = [];
      setupTrash();
      hook.clearHook();
      playState = playStateList.restartLoading;
      offset = -250;
    }
}

function checkHook() {
  if (offset > -250) {
    mySound.stop();
    return;
  }
  if (offset < -9600) hook.up = true;
  if (hook.hooked.length > 0) hook.up = true;
  hook.up ? (offset += 5) : (offset -= 3);
}

function setupTrash() {
  for (let i = 0; i < skraldAntal; i++) {
    let ran = Math.floor(random(skraldImg.length));

    skrald.push(
      new Skrald(skraldImg[ran], random(width - 64), random(799, 10240), ran)
    );
  }
  for (let i = 0; i < fiskAntal; i++) {
    let ran = Math.floor(random(fiskImg.length));
    fisk.push(
      new Fisk(fiskImg[ran], random(width - 64), random(799, 10240), ran)
    );
  }
  for (let i = 0; i < deadAntal; i++) {
    let ran = Math.floor(random(deadFiskImg.length));
    deadFisk.push(
      new DeadFisk(
        deadFiskImg[ran],
        random(width - 64),
        random(799, 10240),
        ran
      )
    );
  }
}

function animation(): boolean {
  if (playState === playStateList.startLoading) {
    image(startImg[playState], 0, 0);
    if (currentFrame === maxFrame1) {
      // @ts-ignore
      startImg[playState].setFrame(0);

      playState = playStateList.menu;
      currentFrame = 0;
      return true;
    }
    currentFrame++;
    return true;
  }

  if (playState === playStateList.menu) {
    background(220);
    image(startImg[playKnap.bagground()], 0, 0);
    playKnap.hover();
    tutorialeKnap.hover();
    return true;
  }

  if (playState === playStateList.gameLoading) {
    image(startImg[playState], 0, 0);

    if (currentFrame === maxFrame2) {
      // @ts-ignore
      startImg[playState].setFrame(0);

      playState = playStateList.play;
      currentFrame = 0;
      return true;
    }
    currentFrame++;
    return true;
  }
  if (playState === playStateList.restartLoading) {
    image(startImg[playState], 0, 0);
    if (currentFrame === maxFrame3) {
      // @ts-ignore
      startImg[playState].setFrame(0);

      playState = playStateList.menu;
      currentFrame = 0;

      return true;
    }
    currentFrame++;
    return true;
  }
}

function waterItemsTick() {
  for (let i = 0; i < skrald.length; i++) {
    skrald[i].tick();
    skrald[i].show();
    if (skrald[i].collect(hook)) {
      hook.addHook(skrald[i]);
      skrald.splice(i, 1);
    }
  }
  for (let i = 0; i < fisk.length; i++) {
    fisk[i].tick();
    fisk[i].move();
    fisk[i].show();
    if (fisk[i].collect(hook)) {
      hook.addHook(fisk[i]);
      fisk.splice(i, 1);
    }
  }
  for (let i = 0; i < deadFisk.length; i++) {
    deadFisk[i].tick();
    deadFisk[i].show();
    if (deadFisk[i].collect(hook)) {
      hook.addHook(deadFisk[i]);
      deadFisk.splice(i, 1);
    }
  }
}

function tutoriale(): boolean {
  if (playState === playStateList.tutoriale) {
    if (tutorialeScreen) {
      if (tutorialeLuk.hover()) image(tutorialeImg[5], 0, 0);
      else if (tutorialeVenstre.hover()) image(tutorialeImg[3], 0, 0);
      else image(tutorialeImg[2], 0, 0);
    } else {
      if (tutorialeHøjre.hover()) image(tutorialeImg[1], 0, 0);
      else if (tutorialeLuk.hover()) image(tutorialeImg[4], 0, 0);
      else image(tutorialeImg[0], 0, 0);
    }
    return true;
  }
}
