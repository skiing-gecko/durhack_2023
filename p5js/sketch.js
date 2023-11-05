let level = 0;
let check = false;
let state = "init";
let checked, unchecked, banned;
let transitiontime = 2000;
let answerbox, submit1, level1input;
let captcha1answer = "2fxgd";
let selectedSquares = [];
let img3x3, level3cat_or_dog, level3fname;
let drawLocX;
let theClickArrayOfPower = [];
let theTenClickArrayOfNewPower = [];
let phase = 1;
let phase2check = false;
let phase3check = false;
let img10x10;
let imgyoff = 100;
let wally1, wally2;
let bg, bg404;
let intro, symbols, catndog, tenxten, phase2, phase3, wally, finalimnotarobot, andahalf, finale;
let bluescreen, music;
let playonce = true;

// const path = require('path')
// const fs = require('fs')


function preload() {
  intro = loadSound("assets/0intro.mp3");
  symbols = loadSound("assets/1symbols.mp3");
  catndog = loadSound("assets/2catndog.mp3");
  tenxten = loadSound("assets/310x10.mp3");
  phase2 = loadSound("assets/4phase2.mp3");
  phase3 = loadSound("assets/5phsae3.mp3");
  wally = loadSound("assets/6 wally.mp3");
  finalimnotarobot = loadSound("assets/7 finalimnotarobot.mp3");
  andahalf = loadSound("assets/7andahalfputsomehwere.mp3");
  finale = loadSound("assets/8 finale.mp3");

  bluescreen = loadSound("assets/blue-screen.mp3");
  music = loadSound("assets/cold-mind-enigma-2-crime-mysterious-detective-music-loopable-95450.mp3");

  bg = loadImage("assets/bg.png");
  bg404 = loadImage("assets/bg404.png");

  // level 0
  checked = loadImage("assets/checked.png");
  unchecked = loadImage("assets/unchecked.png");
  banned = loadImage("assets/banned.png");

  // level 1
  captcha1 = loadImage("assets/letters-and-numbers/2fxgd.png");

  // level 2
  let imgs3x3 = [
    "0_DDDCDCDCC_C.png",
    "22_CDCCCDDCC_D.png",
    "30_CCDCDDDDC_D.png",
    "33_DDDDCCDCD_C.png",
    "27_DDDDDDDCC_D.png"
  ];
  let i = Math.floor(Math.random() * imgs3x3.length);

  img3x3 = loadImage("assets/kaptchas/" + imgs3x3[i]);

  level3fname = imgs3x3[i];
  let l = level3fname.length;
  level3cat_or_dog = imgs3x3[i][l-5];

  // level 3
  img10x10 = loadImage("assets/10x10-export.png");

  // level 4
  wally1 = loadImage("assets/wally1.jpg");
  wally2 = loadImage("assets/wally2.jpg");
}

function setup() {
  createCanvas(800, 800);

  drawLocX = (width - 480)/2;
  
  for (let i = 0; i < 9; i++) {
    let hlb = drawLocX + 10 + (i%3)*155;
    let wlb = 15 + 100 + 10 + (Math.floor(i/3))*155 + imgyoff;
    numOfCorrect = 0;
    [...level3fname].forEach((x) => {
      if (x === level3cat_or_dog) numOfCorrect += 1;
    });
    numOfCorrect -= 1;
    let squareCorrect = (level3cat_or_dog === level3fname[level3fname.length - 6 - (9 - i)]);
    theClickArrayOfPower.push([hlb, wlb, squareCorrect, level3fname[level3fname.length - 6 - (9 - i)], i]);
  }
  img10x10.resize(555,655);
  wally1.resize(800,450);
  wally2.resize(800,450);

  music.loop();
  intro.play();
}

function draw() {

  // background(250,222,195);
  imageMode(CORNER);
  image(bg, 0, 0);
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
    imageMode(CENTER);
    image(img, width/2, height/2);
  } else if (level === 1) {
    if (playonce === true) {
      symbols.play();
      playonce = false;
    }
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
    imageMode(CENTER);
    image(captcha1, width/2, height/2, 200, 50);
    answerbox.show();
  } else if (level === 2) {
    if (playonce === true) {
      catndog.play();
      playonce = false;
    }
    imageMode(CORNER);
    image(img3x3, drawLocX, 15 + imgyoff, 470, 570);
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
        state = "level3phase1";
        nextlevel();
        selectedSquares = [];
      }
    }
  } else if (level === 3) {
    imageMode(CORNER);
    image(img10x10, drawLocX, 15 + imgyoff);
    noStroke();
    strokeWeight(1);
    fill(255);
    textSize(28);
    if (phase === 1) { // mammals
      if (playonce === true) {
        tenxten.play();
        playonce = false;
      }
      text("Please Select The Mammals", drawLocX+100, 75 + imgyoff);
      theTenClickArrayOfNewPower = [
        [0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],
        [0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true],
        [0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],
        [0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true],
        [0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true]
      ];
    } else if (phase === 2) {
      if (playonce === true) {
        phase2.play();
        playonce = false;
      }
      textSize(20);
      text("Please Unselect The Non-Primes and Select The Primes", drawLocX+25, 75 + imgyoff);
      theTenClickArrayOfNewPower = [
        [0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,false],[0,0,false],
        [0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,false],[0,0,true],[0,0,false],[0,0,false],[0,0,true],
        [0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,false],
        [0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],
        [0,0,true],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],
        [0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true]
      ];
      if (phase2check === false) {
        vals = [7,8,9,25,26,27,28,29,35,36,37,38,39,42,43,44,46,47,48,49,50,51,52,53,54,61,62,63,64,66,67,68,69,70,71,72,73,75,76,77,78,79,81,82,83,86,87,88,89,91,92,93,96,97,98,99];
        selectedSquares = [];
        vals.forEach((i) => {
          selectedSquares.push(theTenClickArrayOfNewPower[i]);
        });
        phase2check = true;
      } 
    } else if (phase === 3) {
      if (playonce === true) {
        phase3.play();
        playonce = false;
      }
      text("Now select the opposite cells", drawLocX+100, 75 + imgyoff)
      theTenClickArrayOfNewPower = [
        [0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,false],[0,0,false],
        [0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,false],[0,0,true],[0,0,false],[0,0,false],[0,0,true],
        [0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,true],[0,0,false],
        [0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],
        [0,0,true],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],
        [0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true],
        [0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,false],[0,0,false],[0,0,true],[0,0,true],[0,0,true],[0,0,true]
      ];
      theTenClickArrayOfNewPower.forEach((i) => {
        i[2] = !i[2];
      });
      if (phase3check === false) {
        vals = [7,8,9,15,16,17,23,24,25,26,27,28,29,33,34,35,36,37,38,39,42,43,44,46,49,50,51,52,53,54,55,56,57,58,70,86,87,88,89,91,92,93,96,97,98,99];
        selectedSquares = [];
        vals.forEach((i) => {
          selectedSquares.push(theTenClickArrayOfNewPower[i]);
        });
        phase3check = true;
      }
    }
    for (let i = 0; i < 100; i++) {
      let hlb = drawLocX + 5 + (i%10)*55;
      let wlb = 15 + 100 + 5 + (Math.floor(i/10))*55 + imgyoff;
      theTenClickArrayOfNewPower[i][0] = hlb;
      theTenClickArrayOfNewPower[i][1] = wlb;
    }
    numOfCorrect = 0;
    theTenClickArrayOfNewPower.forEach((i) => {
      if (i[2] === true) numOfCorrect++;
    });
    correctSum = 0;
    selectedSquares.forEach((i) => {
      noFill();
      strokeWeight(4);
      stroke(255,100,100);
      square(i[0], i[1], 50);
      if (i[2] === false) {
        correctSum = 0;
      } else {
        correctSum += 1;
      }
    });
    if (correctSum === numOfCorrect) {
      phase += 1;
      correctSum = 0;
      playonce = true;
    }
    if (phase >= 4) {
      nextlevel();
      phase = 1;
    }
  } else if (level === 4) { // wally
    if (playonce === true) {
      wally.play();
      playonce = false;
    }
    image(wally1, 0, 200);
    textSize(40);
    textAlign(CENTER);
    fill(255);
    text("Find Wally!", drawLocX+85, 50);
  } else if (level === 5) {
    image(wally2, 0, 200);
    textSize(40);
    textAlign(CENTER);
    text("Find Wally, again!", drawLocX+85, 50);
    fill(255);
  } else if (level === 6 || level === 7 || level === 8) {
    if (playonce === true && level === 6) {
      finalimnotarobot.play();
      playonce = false;
    }
    if (playonce === true && level === 7) {
      andahalf.play();
      playonce = false;
    }
    if (check === true && state === "init") {
      state = "pressed_once";
      setTimeout(nextlevel, transitiontime);
    }
    let img;
    if (check === false) {
      img = unchecked;
    } else {
      if (level === 8) {
        img = checked;
      } else {
        img = banned;
      }
    }
    imageMode(CENTER);
    image(img, width/2, height/2);
  } else if (level === 9) {
    if (playonce === true && state === "init") {
      finale.play();
      playonce = false;
    }
    if (check === false && state === "init") {
      state = "waiting";
      setTimeout(error404, 6000);
    } else if (check === true && state === "init") {
      imageMode(CORNER);
      image(bg404, 0, 0);
    }
  }
}

function error404() {
  check = true;
  state = "init";
  bluescreen.setVolume(50);
  bluescreen.play();
}

function mousePressed() {
  // console.log(mouseX, mouseY);
  if (level === 0 || level === 6 || level === 7 || level === 8) {
    if (mouseX > 200 && mouseY > 365 && mouseX < 270 && mouseY < 435) {
      check = true;
    }
  } else if (level === 2) {
    theClickArrayOfPower.forEach((i) => {
      if (mouseX > i[0] && mouseX < i[0]+140 && mouseY > i[1] && mouseY < i[1]+140) {
        if (arr_has_arr(selectedSquares, i) === false) {
          selectedSquares.push(i);
        } else {
          // remove item
          let idx = arr_indexOf(selectedSquares, i);
          selectedSquares.splice(idx, 1);
        }
      }
    });
  } else if (level === 3) {
    theTenClickArrayOfNewPower.forEach((i) => {
      if (mouseX > i[0] && mouseX < i[0]+50 && mouseY > i[1] && mouseY < i[1]+50) {
        if (arr_has_arr(selectedSquares, i) === false) {
          selectedSquares.push(i);
        } else {
          let idx = arr_indexOf(selectedSquares, i);
          selectedSquares.splice(idx, 1);
        }
      }
    });
  } else if (level === 4) {
    if (mouseX > 485 && mouseX < 505 && mouseY > 370 && mouseY < 390) {
      nextlevel();
    }
  } else if (level === 5) {
    if (mouseX > 675 && mouseX < 695 && mouseY > 545 && mouseY > 565) {
      nextlevel();
    }
  }
}

// check an array is equal to another array
function arr_equal(a, b) {
  if (a.length != b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) {
      return false;
    }
  }
  return true
}

// get index of b in a
function arr_indexOf(a, b) {
  let idx = 0;
  let flag = false;
  a.forEach((i) => {
    if (arr_equal(i, b) === false && flag === false) {idx ++;}
    if (arr_equal(i, b) === true) {flag = true;}
  });
  if (flag === false) return null;
  return idx;
}

// check if a (array of arrays) contains b (an array)
function arr_has_arr(a, b) {
    let flag = false;
    a.forEach((i) => {
    // console.log(arr_equal(i,b));
    if (arr_equal(i, b) == true){
      flag = true;
    }
  });
  return flag;
}

function nextlevel() {
  level += 1;
  check = false;
  state = "init";
  playonce = true;
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