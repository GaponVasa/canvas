let random_suare = (function() {
  let ctx, windowWidth, windowHeight, options;
  let currentHue = 0;
  let tick = 0;
  
  let run = (
    canvasBody,
    count = 3,
    sparkLife = 0.1,
    size = 20,
    sizeRandom = 20,
    speedChangeColor = 10
  ) => {
    ctx = canvasBody.getContext("2d");
    windowWidth = canvasBody.width = window.innerWidth;
    windowHeight = canvasBody.height = window.innerHeight;
    options = {
      //кількість квадратів які з'являються за один раз
      count,
      //розмір квадратів в px
      size,
      //максимальний розмір на який збільшиться квадрат 
      sizeRandom,
      //час життя. Чим менше значення тим довше зникає.
      sparkLife,
      //швидкість зміни кольору квадратів. Чим більше тим менша швидкість.
      speedChangeColor,
      //колір в HSL
      color = "hsl(hue, 100%, 50%)"
    };
    window.addEventListener("resize", () => {
      windowWidth = canvasBody.width = window.innerWidth;
      windowHeight = canvasBody.height = window.innerHeight;
    });
    animate();
  };

  let animate = () => {
    window.requestAnimationFrame(animate);
    if (currentHue === 356) {
      currentHue = 0;
    }
    if (tick % options.speedChangeColor === 0) {
      currentHue++;
    }
    tick++;
    step();
  };

  let step = () => {
    let fillColor = options.color.replace("hue", currentHue);
    ctx.fillStyle = fillColor;

    let random, randomWidth, randomHeight;
    for (let i = 0; i < options.count; i++) {
      random = Math.random() * options.sizeRandom;
      randomWidth = Math.random() * windowWidth;
      randomHeight = Math.random() * windowHeight;
      ctx.fillRect(
        -(options.size / 2) + randomWidth,
        -(options.size / 2) + randomHeight,
        options.size + random,
        options.size + random
      );
    }

    ctx.fillStyle = "rgba(255, 255, 255," + options.sparkLife + ")";
    ctx.fillRect(0, 0, windowWidth, windowHeight);
  };

  return {
    start: run
  };
})();
