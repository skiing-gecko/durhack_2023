let level = 1;
let check = false;
let state = "init";
let checked, unchecked;
let transitiontime = 2000;
let answerbox, submit1, level1input;
let captcha1answer = "2fxgd";

function preload() {
  // level 0
  checked = loadImage("assets/checked.png");
  unchecked = loadImage("assets/unchecked.png");

  // level 1
  captcha1 = loadImage("assets/letters-and-numbers/2fxgd.png");
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
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
  }
}

function mousePressed() {
  if (level === 0) {
    if (mouseX > 100 && mouseY > 265 && mouseX < 170 && mouseY < 335) {
      check = true;
    }
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
    state = "captcha1correct";
    answerbox.remove();
    submit1.remove();
    nextlevel();
  }
}