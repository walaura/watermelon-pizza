import { randomButPrefersEdges } from "./helper";
import { stickers } from "./stickers";

const $stickers = document.querySelector("x-stickers");
const $bg = document.querySelector("x-bg");
const $fg = document.querySelector("x-fg");
const $year = document.querySelector("x-year");

let isPhone = false;
let [x, y] = [0, 0];
let [targetX, targetY] = [0, 0];
let stickerCount = 0;
let ticks = 0;

const canvasScale = Math.min(
  1000,
  Math.max(window.innerWidth, window.innerHeight)
);
const stickerSize = 0.15;
const initialStickerRampUp = 10;

const makeSticker = $ctx => {
  const size = canvasScale * stickerSize;
  const $sticker =
    $stickers.children[Math.floor(Math.random() * stickers.length)];

  const heightDelta = $sticker.height / $sticker.width;
  const [x, y] = (isPhone
    ? [
        Math.random() * canvasScale,
        Math.random() *
          canvasScale *
          (window.innerHeight / window.innerWidth) *
          0.3
      ]
    : [
        randomButPrefersEdges() * canvasScale,
        Math.random() * canvasScale * (window.innerHeight / window.innerWidth)
      ]
  ).map(val => val - size / 2);

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

  const targetYWithScroll = targetY + document.scrollingElement.scrollTop / 750;
  const stickerInterval = stickerCount <= initialStickerRampUp ? 15 : 50;

  x = x + (targetX - x) / 10;
  y = y + (targetYWithScroll - y) / 10;
  x = x - (x - targetX) / 10;
  y = y - (y - targetYWithScroll) / 10;

  if (ticks % stickerInterval === 0) {
    makeSticker($ctx);
    stickerCount++;
  }

  $bg.style.transform = `
    translateX(${1 * -x}em)
    translateY(${1 * -y}em)
    rotateX(${5 * -y}deg)
    rotateY(${5 * x}deg)
    translateZ(-5em)
    scale(1.2)
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
  $year.innerText = new Date().getFullYear();

  await Promise.all(
    stickers.map(src => {
      const $sticker = document.createElement("img");

      return new Promise(yay => {
        $sticker.onload = () => {
          yay();
        };
        $sticker.alt = "";
        $sticker.src = src;
        $stickers.appendChild($sticker);
      });
    })
  );
  const $canvas = document.createElement("canvas");
  const $ctx = $canvas.getContext("2d");
  $bg.appendChild($canvas);

  $canvas.height = canvasScale;
  $canvas.width = canvasScale;
  $ctx.shadowColor = "rgba(0,0,0,.5)";
  $ctx.shadowBlur = 5;

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    requestAnimationFrame(function() {
      loop($ctx);
    });
  }
  if (window.matchMedia("(max-aspect-ratio: 1/1)").matches) {
    isPhone = true;
    document.documentElement.dataset.isPhone = isPhone;
  }
};

main();
