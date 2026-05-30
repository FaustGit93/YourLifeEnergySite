(function () {
  let player;
  let gravity = 1;
  let jumpForce = -15;
  let groundLevel;
  let obstacles = [];
  let spawnTimer = 0;
  let startDelay = 2000;
  let nextWaveTime = 0;
  let spawning = false;

  const sketch = (p) => {
    p.setup = function () {
      const container = document.getElementById("gd-game-container");
      p.createCanvas(container.offsetWidth, container.offsetHeight).addClass('gd-canvas');
      p.frameRate(60);
      updateGroundLevel(p);
      initPlayer(p);
      nextWaveTime = p.millis() + startDelay;
    };

    p.draw = function () {
      p.background(3);

      // Terreno
      p.fill(255, 0, 0, 60);
      p.rect(0, groundLevel + player.size, p.width, p.height - groundLevel);

      // Gestione spawn ostacoli
      if (p.millis() >= nextWaveTime && !spawning) {
        spawnWave(p);
      }

      // Aggiorna e disegna ostacoli
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();
        obstacles[i].checkCollision(p);
        obstacles[i].draw(p);
        if (obstacles[i].offscreen()) {
          obstacles.splice(i, 1);
        }
      }

      // Gravità e movimento player
      player.velocityY += gravity;
      player.y += player.velocityY;

      if (player.y >= groundLevel) {
        player.y = groundLevel;
        player.velocityY = 0;
        player.isJumping = false;
      }

      // Gestione lampeggio
      let flashActive = false;
      if (player.isFlashing) {
        const elapsed = p.millis() - player.flashStart;
        if (elapsed > player.flashDuration) {
          player.isFlashing = false;
        } else {
          const flashOn = Math.floor(elapsed / 100) % 2 === 0;
          flashActive = flashOn;
        }
      }

      // Animazione rotazione
      p.push();
      p.translate(player.x + player.size / 2, player.y + player.size / 2);

      const targetRotation = 65;
      const rotationSpeed = 10;

      if (player.rotationDirection === 1) {
        player.rotation += rotationSpeed;
        if (player.rotation >= targetRotation) {
          player.rotation = targetRotation;
          player.rotationDirection = -1;
        }
      } else if (player.rotationDirection === -1) {
        player.rotation -= rotationSpeed;
        if (player.rotation <= 0) {
          player.rotation = 0;
          player.rotationDirection = 0;
        }
      }

      p.rotate(p.radians(player.rotation));
      if (flashActive) {
        p.fill(player.flashColor);
      } else {
        p.fill(255);
      }
      p.rect(-player.size / 2, -player.size / 2, player.size, player.size);
      p.pop();
    };

    p.mousePressed = function () {
      if (isInsideCanvas(p) && isInJumpZone(p.mouseY)) {
        jump();
      }
    };

    p.touchStarted = function () {
      if (isInsideCanvas(p) && isInJumpZone(p.touchY)) {
        jump();
        return false;
      }
      return true;
    };

    p.windowResized = function () {
      const container = document.getElementById("gd-game-container");
      p.resizeCanvas(container.offsetWidth, container.offsetHeight);
      updateGroundLevel(p);
      if (player) player.y = groundLevel;
    };

    function updateGroundLevel(p) {
      groundLevel = p.height / 2;
    }

    function initPlayer(p) {
      player = {
        x: 100,
        y: groundLevel,
        size: 40,
        velocityY: 0,
        isJumping: false,
        rotation: 0,
        rotationDirection: 0,
        isFlashing: false,
        flashStart: 0,
        flashDuration: 500, // Durata del lampeggio (in millisecondi)
        flashColor: p.color(255,0,0) // Colore del lampeggio (giallo)
      };
    }

    function jump() {
      if (!player.isJumping) {
        player.velocityY = jumpForce;
        player.isJumping = true;
        player.rotationDirection = 1;
      }
    }

    function spawnWave(p) {
      spawning = true;
      let amount = Math.floor(Math.random() * 3) + 1;
      let delayBetween = 500;

      for (let i = 0; i < amount; i++) {
        setTimeout(() => {
          obstacles.push(new Obstacle(p.width, groundLevel + player.size));
          if (i === amount - 1) {
            nextWaveTime = p.millis() + p.random(1500, 3000);
            spawning = false;
          }
        }, i * delayBetween);
      }
    }

    class Obstacle {
      constructor(x, baseY) {
        this.x = x;
        this.baseY = baseY;
        this.size = 30;
        this.speed = 4;
      }

      update() {
        this.x -= this.speed;
      }

      draw(p) {
        p.fill(255, 0, 0);
        p.triangle(
          this.x, this.baseY,
          this.x + this.size / 2, this.baseY - this.size,
          this.x + this.size, this.baseY
        );
      }

      checkCollision(p) {
        if (
          !player.isFlashing &&
          this.x < player.x + player.size &&
          this.x + this.size > player.x &&
          this.baseY > player.y &&
          this.baseY - this.size < player.y + player.size
        ) {
          player.isFlashing = true;
          player.flashStart = p.millis();
        }
      }

      offscreen() {
        return this.x + this.size < 0;
      }
    }

    function isInJumpZone(y) {
      return y > groundLevel - 100;
    }

    function isInsideCanvas(p) {
      const bounds = p.canvas.getBoundingClientRect();
      let x = p.touchX !== undefined ? p.touchX : p.mouseX;
      let y = p.touchY !== undefined ? p.touchY : p.mouseY;
      return (
        x >= 0 && x <= bounds.width &&
        y >= 0 && y <= bounds.height
      );
    }

    // Accesso da fuori
    window.setPlayerRotation = function (rotation) {
      player.rotation = rotation;
    };

    window.setRotationDirection = function (direction) {
      player.rotationDirection = direction;
    };
  };

  new p5(sketch, document.getElementById("gd-game-container"));
})();
