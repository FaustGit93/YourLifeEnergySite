let brushSize = 15;
let spacing = 40;
let lastX = null;
let lastY = null;
let drawing = false;
let clearing = false;

let rotationSpeed = 0.05;
let angle = 0;

let scrollEnabled = false;
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // Rileva mobile



function setup() {
  let container = select('#drawing-container');
  let isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);

  let w, h;

  if (isMobile) {
    // Dimensione fissa per mobile
    w = 200;
    h = 600;
  } else {
    // Dimensione dinamica su desktop
    w = container.elt.offsetWidth;
    h = container.elt.offsetHeight;

    // Aggiungi anche un resize listener per aggiornare le dimensioni se vuoi:
    window.addEventListener('resize', () => {
      resizeCanvas(container.elt.offsetWidth, container.elt.offsetHeight);
    });
  }

  let canvas = createCanvas(w, h);
  canvas.parent('drawing-container');
  canvas.style('pointer-events', 'none');
  document.addEventListener('contextmenu', e => e.preventDefault());


    if (isMobile) {
        document.addEventListener('touchmove', e => {
            if (drawing && e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
    }


}

function windowResized() {

    resizeCanvas(400, 1000); // Sempre fisso

}


function draw() {
    if (clearing) {
        rectMode(CORNER);
        fill(0, 20);
        rect(0, 0, width, height);
        return;
    }

    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height && !drawing) {
        noStroke();
        let alpha = random(10,70);
        fill(255, 0, 0, alpha);
        rectMode(CENTER);
        push();
        translate(mouseX, mouseY);
        rotate(angle);
        rect(0, 0, brushSize, brushSize);
        pop();
    }

    if (drawing && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        fill(255, 0, 0, 50);
        noStroke();
        rectMode(CENTER);
        push();
        translate(mouseX, mouseY);
        rotate(angle);
        rect(0, 0, brushSize, brushSize);
        pop();
    }

    angle += rotationSpeed;
}

function mousePressed() {
    if (mouseButton === LEFT) drawing = true;
    if (mouseButton === RIGHT) clearing = true;
}

function mouseReleased() {
    if (mouseButton === LEFT) drawing = false;
    if (mouseButton === RIGHT) clearing = false;
}

function mouseWheel(event) {
    if (!drawing) {
        spacing += event.delta * 0.1;
        spacing = constrain(spacing, 5, 50);
    } else {
        brushSize += event.delta * 0.1;
        brushSize = constrain(brushSize, 5, 100);
    }
}

function disableScroll() {
    scrollEnabled = false;
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    scrollEnabled = true;
    document.body.style.overflow = 'auto';
}

function doubleClicked() {
    if (!scrollEnabled) {
        enableScroll();
    } else {
        disableScroll();
    }
}