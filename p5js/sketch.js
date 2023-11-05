let level = 0;
let check = false;
let state = "init";
let checked, unchecked;
let transitiontime = 2000;
let answerbox, submit1, level1input;
let captcha1answer = "2fxgd";
let selectedSquares = [];
let img3x3, level3cat_or_dog, level3fname;
let drawLocX;
let theClickArrayOfPower = [];

// const path = require('path')
// const fs = require('fs')

function preload() {
  // level 0
  checked = loadImage("assets/checked.png");
  unchecked = loadImage("assets/unchecked.png");

  // level 1
  captcha1 = loadImage("assets/letters-and-numbers/2fxgd.png");

  // level 2
  let imgs3x3 = [
    "0_DDDCDCDCC_C.png",
    "22_CDCCCDDCC_D.png",
    "30_CCDCDDDDC_D.png",
    "33_DDDDCCDCD_C.png",
    "27_DDDDDDDCC_D.png"
  ]
  let i = Math.floor(Math.random() * imgs3x3.length);
  img3x3 = loadImage("assets/kaptchas/" + imgs3x3[i]);
  level3fname = imgs3x3[i];
  let l = level3fname.length;
  level3cat_or_dog = imgs3x3[i][l-5];
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);

  drawLocX = (width - 480)/2;
  
  for (let i = 0; i < 9; i++) {
    let hlb = drawLocX + 10 + (i%3)*155;
    let wlb = 15 + 100 + 10 + (Math.floor(i/3))*155;
    numOfCorrect = 0;
    [...level3fname].forEach((x) => {
      if (x === level3cat_or_dog) numOfCorrect += 1;
    });
    numOfCorrect -= 1;
    let squareCorrect = (level3cat_or_dog === level3fname[level3fname.length - 6 - (9 - i)]);
    theClickArrayOfPower.push([hlb, wlb, squareCorrect, level3fname[level3fname.length - 6 - (9 - i)], i]);
  }
}

function draw() {
  background(250,222,195);
  // checkedbox level 0
  if (level === 0) {
    if (check === true && state === "init") {
      state = "check_pressed";
      setTimeout(nextlevel, transitiontime);
    }
    let img;
    if (check === false) {
      img = unchecked;
    } else {
      img = checked;
    }
    image(img, width/2, height/2);
  } else if (level === 1) {
    if (state !== "level1") {
      state = "level1";
      answerbox = createInput("");
      answerbox.position(width/2-100, height/2 + 30);
      answerbox.size(125);
      answerbox.input(captch1input);

      submit1 = createButton("Enter");
      submit1.position(width/2 + 30, height/2+30);
      submit1.size(70);
      submit1.mousePressed(captcha1submit);
    }
    image(captcha1, width/2, height/2, 200, 50);
    answerbox.show();
  } else if (level === 2) {
    imageMode(CORNER);
    image(img3x3, drawLocX, 15, 470, 570);
    // loop through each square index
    for (let i = 0; i < 9; i++) {
      // get number of correct selections
      let correctSum = 0;
      selectedSquares.forEach((i) => {
        noFill();
        strokeWeight(4);
        stroke(255,100,100);
        square(i[0],i[1],140);
        if (i[2] === false) {
          correctSum = 0;
        } else {
          correctSum += 1;
        }
      });
      
      if (correctSum === numOfCorrect) {
        state = "level3";
        nextlevel();
        selectedSquares = [];
      }
    }
  } else if (level === 3) {
    // console.log(3);
  }
}

function mousePressed() {
  // console.log(mouseX, mouseY);
  if (level === 0) {
    if (mouseX > 200 && mouseY > 365 && mouseX < 270 && mouseY < 435) {
      check = true;
    }
  } else if (level === 2) {
    theClickArrayOfPower.forEach((i) => {
      if (mouseX > i[0] && mouseX < i[0]+140 && mouseY > i[1] && mouseY < i[1]+140) {
        if (!selectedSquares.includes(i)) {
          selectedSquares.push(i);
        } else {
          // remove item
          let idx = selectedSquares.indexOf(i);
          selectedSquares.splice(idx, 1);
        }
      }
    });
  }
}

function nextlevel() {
  level += 1;
  check = false;
}

function captch1input() {
  level1input = this.value();
}

function captcha1submit() {
  if (level1input === captcha1answer) {
    state = "level2";
    answerbox.remove();
    submit1.remove();
    nextlevel();
  }
}