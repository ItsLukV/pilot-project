var WaterItems = (function () {
    function WaterItems(x, y, id, img) {
        this.img = img;
        this.x = x;
        this.spawnY = y;
        this.y = y;
        this.id = id;
        this.hooked = false;
        this.w = 128;
        this.h = 128;
    }
    WaterItems.prototype.tick = function () {
        if (this.hooked) {
            this.x = hook.hookedX;
            this.y = hook.y;
        }
        else
            this.y = offset + this.spawnY;
    };
    WaterItems.prototype.show = function () {
        image(this.img, this.x, this.y, this.w, this.h);
        if (hitboxShow)
            ellipse(this.x + 64, this.y + 64, 64);
    };
    WaterItems.prototype.collect = function (obj) {
        if (dist(this.x, this.y, obj.hookedX, obj.y) < 64)
            return true;
        return false;
    };
    return WaterItems;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DeadFisk = (function (_super) {
    __extends(DeadFisk, _super);
    function DeadFisk(img, x, y, id) {
        var _this = _super.call(this, x, y, id, img) || this;
        _this.points = -1;
        return _this;
    }
    return DeadFisk;
}(WaterItems));
var Fisk = (function (_super) {
    __extends(Fisk, _super);
    function Fisk(img, x, y, id) {
        var _this = _super.call(this, x, y, id, img[1]) || this;
        _this.flipImg = img;
        _this.points = -2;
        _this.xVec = 1;
        return _this;
    }
    Fisk.prototype.move = function () {
        if (this.x >= width - this.w / 2 + 10) {
            this.xVec *= -1;
            this.Flip();
        }
        if (this.x <= 0 - 10) {
            this.xVec *= -1;
            this.Flip();
        }
        this.x += this.xVec;
    };
    Fisk.prototype.Flip = function () {
        if (this.xVec > 0) {
            this.img = this.flipImg[1];
        }
        else {
            this.img = this.flipImg[0];
        }
    };
    return Fisk;
}(WaterItems));
var Krog = (function () {
    function Krog(img, x, y) {
        this.hooked = [];
        this.img = img;
        this.x = x;
        this.hookedX = x;
        this.y = y;
        this.w = 128;
        this.h = 128;
        this.up = false;
    }
    Krog.prototype.tick = function () {
        if (mouseX >= width - 32) {
            this.x = width - 64;
        }
        else if (mouseX <= 0 + 32) {
            this.x = 0;
        }
        else {
            this.x = mouseX - 75 / 2;
        }
        this.hookedX = this.x - 32;
    };
    Krog.prototype.show = function () {
        push();
        strokeWeight(2);
        line(305, 495 + offset, this.x + 40, hookLevel + 17);
        image(this.img, this.x, this.y, 75, 75);
        pop();
        if (hitboxShow)
            ellipse(this.hookedX + 64, this.y + 64, 64);
    };
    Krog.prototype.addHook = function (obj) {
        obj.hooked = true;
        this.hooked.push(obj);
    };
    Krog.prototype.clearHook = function () {
        this.hooked = [];
        this.up = false;
    };
    return Krog;
}());
var Skrald = (function (_super) {
    __extends(Skrald, _super);
    function Skrald(img, x, y, id) {
        var _this = _super.call(this, x, y, id, img) || this;
        _this.points = 1;
        return _this;
    }
    return Skrald;
}(WaterItems));
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
    var fisk1 = [];
    fisk1.push(loadImage("sketch/assets/Fisk/Livefish/fish1 animation.gif"));
    fisk1.push(loadImage("sketch/assets/Fisk/Livefish/fish1 animationflip.gif"));
    fiskImg.push(fisk1);
    var fisk2 = [];
    fisk2.push(loadImage("sketch/assets/Fisk/Livefish/fish2 animation.gif"));
    fisk2.push(loadImage("sketch/assets/Fisk/Livefish/fish2 animationflip.gif"));
    fiskImg.push(fisk2);
    var fisk3 = [];
    fisk3.push(loadImage("sketch/assets/Fisk/Livefish/fish3 animation.gif"));
    fisk3.push(loadImage("sketch/assets/Fisk/Livefish/fish3 animationflip.gif"));
    fiskImg.push(fisk3);
    var turtle = [];
    turtle.push(loadImage("sketch/assets/Fisk/Livefish/turtle animation.gif"));
    turtle.push(loadImage("sketch/assets/Fisk/Livefish/turtle animationflip.gif"));
    fiskImg.push(turtle);
    fishermanImg = loadImage("sketch/assets/fisherman.png");
    krogImg = loadImage("sketch/assets/Hook.gif");
    backgroundImg = loadImage("sketch/assets/background.png");
}
var Knap = (function () {
    function Knap(x, y, w, h, img) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imgIndex = 0;
    }
    Knap.prototype.hover = function () {
        if (mouseX > this.x && mouseX < this.x + this.w) {
            if (mouseY > this.y && mouseY < this.y + this.h) {
                this.imgIndex = 1;
            }
            else {
                this.imgIndex = 0;
            }
        }
        else {
            this.imgIndex = 0;
        }
    };
    Knap.prototype.clicked = function () {
        if (mouseX > this.x && mouseX < this.x + this.w) {
            if (mouseY > this.y && mouseY < this.y + this.h) {
                playState = playStateList.gameLoading;
                mySound.play();
            }
        }
    };
    Knap.prototype.bagground = function () {
        return this.imgIndex;
    };
    return Knap;
}());
var Score = (function () {
    function Score() {
        this.highScore = 0;
        this.score = 0;
    }
    Score.prototype.tick = function () {
        if (this.score > this.highScore)
            this.highScore = this.score;
    };
    Score.prototype.save = function () {
        localStorage.setItem("Score", JSON.stringify(this.highScore));
    };
    Score.prototype.load = function () {
        var hs = JSON.parse(localStorage.getItem("Score"));
        if (hs === null)
            this.highScore = 0;
        else
            this.highScore = JSON.parse(localStorage.getItem("Score"));
    };
    Score.prototype.show = function () {
        this.tick();
        push();
        textSize(40);
        this.score = this.countPoints();
        fill(255, 220);
        var scoreTxt = "Score: " + this.score;
        rect(0, 0, textWidth(scoreTxt) + 20, 40 + 10);
        fill(0);
        text(scoreTxt, 0 + 10, 40);
        fill(255, 220);
        var highTxt = "HighScore: " + this.highScore;
        rect(width - textWidth(highTxt) - 20, 0, textWidth(highTxt) + 20, 40 + 10);
        fill(0);
        text(highTxt, width - textWidth(highTxt) - 10, 40);
        pop();
    };
    Score.prototype.countPoints = function () {
        var sum = 0;
        hook.hooked.forEach(function (item) {
            sum += item.points;
        });
        return sum;
    };
    return Score;
}());
window.addEventListener("unload", function (event) {
    score.save();
});
var offset = -250;
var fishermanImg;
var krogImg;
var hook;
var skraldImg = [];
var skrald = [];
var backgroundImg;
var fisk = [];
var fiskImg = [];
var deadFiskImg = [];
var deadFisk = [];
var start1Img = [];
var maxFrame1 = Math.floor(7 * 60);
var maxFrame2 = 60;
var maxFrame3 = 60;
var currentFrame = 0;
var score;
var mySound;
var hookLevel = 400;
var skraldAntal = 50;
var fiskAntal = 30;
var deadAntal = 30;
var hitboxShow = true;
var playStateList;
(function (playStateList) {
    playStateList[playStateList["menu"] = 0] = "menu";
    playStateList[playStateList["play"] = 1] = "play";
    playStateList[playStateList["startLoading"] = 2] = "startLoading";
    playStateList[playStateList["gameLoading"] = 3] = "gameLoading";
})(playStateList || (playStateList = {}));
var playState = playStateList.startLoading;
var knap;
function preload() {
    loadImages();
}
function setup() {
    createCanvas(640, 800);
    setupTrash();
    score = new Score();
    score.load();
    knap = new Knap(243, 294, 176, 84);
    hook = new Krog(krogImg, 640 / 2, hookLevel);
}
function draw() {
    if (animation())
        return;
    checkHook();
    image(backgroundImg, 0, 0 + offset);
    image(fishermanImg, 290, 450 + offset);
    waterItemsTick();
    hook.tick();
    hook.show();
    for (var i = 0; i < hook.hooked.length; i++) {
        hook.hooked[i].tick();
        hook.hooked[i].show();
    }
    score.show();
}
function mousePressed() {
    knap.clicked();
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
            offset = -250;
            playState = playStateList.menu;
        }
}
function checkHook() {
    if (offset > -250) {
        mySound.stop();
        return;
    }
    if (offset < -9600)
        hook.up = true;
    if (hook.hooked.length > 0)
        hook.up = true;
    hook.up ? (offset += 5) : (offset -= 3);
}
function setupTrash() {
    for (var i = 0; i < skraldAntal; i++) {
        var ran = Math.floor(random(skraldImg.length));
        skrald.push(new Skrald(skraldImg[ran], random(width - 64), random(799, 10240), ran));
    }
    for (var i = 0; i < fiskAntal; i++) {
        var ran = Math.floor(random(fiskImg.length));
        fisk.push(new Fisk(fiskImg[ran], random(width - 64), random(799, 10240), ran));
    }
    for (var i = 0; i < deadAntal; i++) {
        var ran = Math.floor(random(deadFiskImg.length));
        deadFisk.push(new DeadFisk(deadFiskImg[ran], random(width - 64), random(799, 10240), ran));
    }
}
function animation() {
    if (playState === playStateList.startLoading) {
        image(start1Img[playState], 0, 0);
        if (currentFrame === maxFrame1 - 1) {
            playState = playStateList.menu;
            currentFrame = 0;
            return true;
        }
        currentFrame++;
        return true;
    }
    if (playState === playStateList.menu) {
        background(220);
        image(start1Img[knap.bagground()], 0, 0);
        knap.hover();
        return true;
    }
    if (playState === playStateList.gameLoading) {
        image(start1Img[playState], 0, 0);
        if (currentFrame === maxFrame2) {
            playState = playStateList.play;
            currentFrame = 0;
            return true;
        }
        currentFrame++;
        return true;
    }
}
function waterItemsTick() {
    for (var i = 0; i < skrald.length; i++) {
        skrald[i].tick();
        skrald[i].show();
        if (skrald[i].collect(hook)) {
            hook.addHook(skrald[i]);
            skrald.splice(i, 1);
        }
    }
    for (var i = 0; i < fisk.length; i++) {
        fisk[i].tick();
        fisk[i].move();
        fisk[i].show();
        if (fisk[i].collect(hook)) {
            hook.addHook(fisk[i]);
            fisk.splice(i, 1);
        }
    }
    for (var i = 0; i < deadFisk.length; i++) {
        deadFisk[i].tick();
        deadFisk[i].show();
        if (deadFisk[i].collect(hook)) {
            hook.addHook(deadFisk[i]);
            deadFisk.splice(i, 1);
        }
    }
}
//# sourceMappingURL=build.js.map