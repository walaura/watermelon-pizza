import { randomButPrefersEdges } from "./helper";

const maxSize = Math.max(window.innerWidth, window.innerHeight);

const $stickers = document.querySelector("x-stickers");
const $bg = document.querySelector("x-bg");
const $fg = document.querySelector("x-fg");
const $year = document.querySelector("x-year");

let [x, y] = [0, 0];
let [targetX, targetY] = [0, 0];
let ticks = 0;

const canvasScale = maxSize;
const stickerSize = 0.15;

const stickers = [
  require("../stix/thumbos.png"),
  require("../stix/skull.png"),
  require("../stix/star.png"),
  require("../stix/wyld.png"),
  require("../stix/ace-rat.png"),
  require("../stix/pronoun.png"),
  require("../stix/css.png")
];

const makeSticker = $ctx => {
  const size = canvasScale * stickerSize;
  const $sticker =
    $stickers.children[Math.floor(Math.random() * stickers.length)];

  const heightDelta = $sticker.height / $sticker.width;

  const [x, y] = [
    randomButPrefersEdges() * canvasScale,
    Math.random() * canvasScale * (window.innerHeight / window.innerWidth)
  ].map(val => val - size / 2);

  $ctx.save();
  $ctx.translate(x, y);
  $ctx.rotate(Math.random() * 360);
  $ctx.drawImage(
    $sticker,
    size / heightDelta / -2,
    size / -2,
    size / heightDelta,
    size
  );
  $ctx.restore();
};

const loop = $ctx => {
  ticks++;

  const targetYWithScroll = targetY + $fg.scrollTop / 750;

  x = x + (targetX - x) / 10;
  y = y + (targetYWithScroll - y) / 10;
  x = x - (x - targetX) / 10;
  y = y - (y - targetYWithScroll) / 10;

  if (ticks % 50 === 0) {
    makeSticker($ctx);
  }

  $bg.style.transform = `
    translateX(${1 * -x}em)
    translateY(${1 * -y}em)
    rotateX(${5 * -y}deg)
    rotateY(${5 * x}deg)
    translateZ(-20em)
    scale(1.5)
  `;

  requestAnimationFrame(function() {
    loop($ctx);
  });
};

window.onmousemove = ({ clientX, clientY, target }) => {
  if (!target.closest("a")) {
    targetY = (clientY / window.innerHeight) * 2 - 1;
    targetX = (clientX / window.innerWidth) * 2 - 1;
  }
};

const main = async () => {
  await Promise.all(
    stickers.map(src => {
      const $sticker = document.createElement("img");

      return new Promise(yay => {
        $sticker.onload = () => {
          yay();
        };
        $sticker.src = src;
        $stickers.appendChild($sticker);
      });
    })
  );
  const $canvas = document.createElement("canvas");
  $bg.appendChild($canvas);
  const $ctx = $canvas.getContext("2d");

  $canvas.height = maxSize;
  $canvas.width = maxSize;
  $ctx.scale(maxSize / canvasScale, maxSize / canvasScale);
  $ctx.shadowColor = "rgba(0,0,0,.5)";
  $ctx.shadowBlur = 5;
  for (let i = 0; i < 10; i++) {
    makeSticker($ctx);
  }
  requestAnimationFrame(function() {
    loop($ctx);
  });
};

$year.innerText = new Date().getFullYear();

main();
