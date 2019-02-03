let runOfDots = (function() {
  class CreateCircle {
    constructor() {
      (this.posX = 0),
      (this.posY = 0),
      (this.directionX = 0),
      (this.directionY = 0),
      (this.nextChangeDirection = 0);
    }
    findRandomDirection() {
      let direction = () => {
        return Math.random() < 0.5 ? (Math.random() < 0.5 ? -1 : 0) : 1;
      };
      do {
        this.directionX = direction();
        this.directionY = direction();
      } while (this.directionX === 0 && this.directionY === 0);
    }

    findPosition(maxSizeWidth, maxSizeHeight, size) {
      let findPosition = (maxSize, size) => {
        let position = 0;
        while (position <= size || position >= maxSize - size) {
          position = this.randomeMaxToMin(maxSize, size);
        }
        return position;
      };
      this.posX = findPosition(maxSizeWidth, size);
      this.posY = findPosition(maxSizeHeight, size);
    }

    randomeMaxToMin(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    setNextChangeDirection(options) {
      let { maxTickChange } = options;
      this.nextChangeDirection = Math.floor(Math.random() * maxTickChange);
    }

    subNextChangeDirection() {
      this.nextChangeDirection--;
    }
  }

  class animateCanvas {
    constructor() {
      this.setCircles = [];
    }

    setup(options, constr) {
      let { windowWidth, windowHeight, size, numberOfCopies } = options;
      let currentCircle;
      for (let i = 0; i < numberOfCopies; i++) {
        currentCircle = new constr();
        currentCircle.findPosition(windowWidth, windowHeight, size);
        currentCircle.findRandomDirection();
        currentCircle.setNextChangeDirection(options);
        this.setCircles.push(currentCircle);
      }
    }

    animate(options) {
      window.requestAnimationFrame(() => this.animate(options));
      this.step(options);
    }

    step(options) {
      let { windowWidth, windowHeight, size, ctx, partTick } = options;
      options.tick++;
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";

      ctx.fillRect(0, 0, windowWidth, windowHeight);
      this.setCircles.forEach(el => {
        if (el.directionX !== 0) {
          el.posX = el.posX + partTick * el.directionX;
          if (el.posX <= size || el.posX >= windowWidth - size) {
            el.directionX = el.directionX * -1;
          }
        }
        if (el.directionY !== 0) {
          el.posY = el.posY + partTick * el.directionY;
          if (el.posY <= size || el.posY >= windowHeight - size) {
            el.directionY = el.directionY * -1;
          }
        }
        ctx.beginPath();
        ctx.arc(el.posX, el.posY, size / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
        if (el.nextChangeDirection === 0) {
          el.findRandomDirection();
          el.setNextChangeDirection(options);
        }
        el.subNextChangeDirection();
      });
    }
  }

  let start = options => {
    options.ctx = options.canvasBody.getContext("2d");
    options.windowWidth = options.canvasBody.width = window.innerWidth;
    options.windowHeight = options.canvasBody.height = window.innerHeight;

    let anim = new animateCanvas();
    anim.setup(options, CreateCircle);
    anim.animate(options);
  };

  return {
    run: start
  };
})();

let options = {
  canvasBody: document.getElementById("canvas"),
  ctx: undefined,
  windowWidth: undefined,
  windowHeight: undefined,
  //розмір крапки
  size: 5,
  //лічильник
  tick: 0,
  //значення кроку руху
  partTick: 2,
  //кількість крапок
  numberOfCopies: 10,
  //максимальне число лічильника після якого змінюється напрямок
  maxTickChange: 200
};

runOfDots.run(options);
