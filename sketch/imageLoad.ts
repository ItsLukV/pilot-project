function loadImages() {
  mySound = loadSound("sketch/assets/Music/bagground.mp3");

  start1Img.push(loadImage("sketch/assets/Start/start1.png"));
  start1Img.push(loadImage("sketch/assets/Start/start2.png"));
  start1Img.push(loadImage("sketch/assets/Start/start0.gif"));
  start1Img.push(loadImage("sketch/assets/Start/start3.gif"));
  start1Img.push(loadImage("sketch/assets/Start/start4.gif"));

  skraldImg.push(loadImage("sketch/assets/Trash/oil barrel.png"));
  skraldImg.push(loadImage("sketch/assets/Trash/tire.png"));
  skraldImg.push(loadImage("sketch/assets/Trash/trashbag.png"));
  skraldImg.push(loadImage("sketch/assets/Trash/straw.png"));
  skraldImg.push(loadImage("sketch/assets/Trash/plastich bag.png"));

  deadFiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish1.png"));
  deadFiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish2.png"));
  deadFiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish3.png"));
  deadFiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish4.png"));
  deadFiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead turtle.png"));

  let fisk1: p5.Image[] = [];
  fisk1.push(loadImage("sketch/assets/Fisk/Livefish/fish1 animation.gif"));
  fisk1.push(loadImage("sketch/assets/Fisk/Livefish/fish1 animationflip.gif"));
  fiskImg.push(fisk1);

  let fisk2: p5.Image[] = [];
  fisk2.push(loadImage("sketch/assets/Fisk/Livefish/fish2 animation.gif"));
  fisk2.push(loadImage("sketch/assets/Fisk/Livefish/fish2 animationflip.gif"));
  fiskImg.push(fisk2);

  let fisk3: p5.Image[] = [];
  fisk3.push(loadImage("sketch/assets/Fisk/Livefish/fish3 animation.gif"));
  fisk3.push(loadImage("sketch/assets/Fisk/Livefish/fish3 animationflip.gif"));
  fiskImg.push(fisk3);

  let turtle: p5.Image[] = [];
  turtle.push(loadImage("sketch/assets/Fisk/Livefish/turtle animation.gif"));
  turtle.push(
    loadImage("sketch/assets/Fisk/Livefish/turtle animationflip.gif")
  );
  fiskImg.push(turtle);

  fishermanImg = loadImage("sketch/assets/fisherman.png");
  krogImg = loadImage("sketch/assets/Hook.gif");
  backgroundImg = loadImage("sketch/assets/background.png");
}
