import React, { useRef, useEffect } from "react";
import { randomButPrefersEdges } from "../../helper";

import styles from "./stickers.module.css";

console.log(styles.stickers);

const getCanvasScale = () =>
  Math.min(1000, Math.max(window.innerWidth, window.innerHeight));
const isPhone = () => window.matchMedia("(max-aspect-ratio: 1/1)").matches;

const stickerSize = 0.15;
const initialStickerRampUp = 10;

const preloadStickers = async $stickers => {
  const list = (await import("./stickers/index")).stickers;
  await Promise.all(
    list.map(src => {
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
  return $stickers;
};

const makeSticker = ($stickers, $ctx, { avoidBackground }) => {
  const canvasScale = getCanvasScale();
  const size = canvasScale * stickerSize;
  const $sticker =
    $stickers.children[Math.floor(Math.random() * $stickers.children.length)];

  const heightDelta = $sticker.height / $sticker.width;

  let x, y;

  if (!avoidBackground) {
    [x, y] = [
      Math.random() * canvasScale,
      (Math.random() / 2 - 0.1) * canvasScale
    ];
  } else if (isPhone()) {
    [x, y] = [
      Math.random() * canvasScale,
      Math.random() *
        canvasScale *
        (window.innerHeight / window.innerWidth) *
        0.3
    ];
  } else {
    [x, y] = [
      randomButPrefersEdges() * canvasScale,
      Math.random() * canvasScale * (window.innerHeight / window.innerWidth)
    ];
  }

  [x, y] = [x, y].map(val => val - size / 2);

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

const withStickers = async ($root, { avoidBackground }) => {
  const canvasScale = getCanvasScale();
  const $stickers = $root.querySelector("." + styles.stickers);
  const $bg = $root.querySelector("." + styles.bg);

  let [x, y] = [0, 0];
  let [targetX, targetY] = [0, 0];
  let stickerCount = 0;
  let ticks = 0;

  const loop = $ctx => {
    ticks++;

    const targetYWithScroll =
      targetY + document.scrollingElement.scrollTop / 750;
    const stickerInterval = stickerCount <= initialStickerRampUp ? 15 : 50;

    x = x + (targetX - x) / 10;
    y = y + (targetYWithScroll - y) / 10;
    x = x - (x - targetX) / 10;
    y = y - (y - targetYWithScroll) / 10;

    if (ticks % stickerInterval === 0) {
      makeSticker($stickers, $ctx, { avoidBackground });
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

  await preloadStickers($stickers);
  const $canvas = document.createElement("canvas");
  const $ctx = $canvas.getContext("2d");
  $bg.appendChild($canvas);

  $canvas.height = canvasScale;
  $canvas.width = canvasScale;
  $ctx.shadowColor = "rgba(0,0,0,.5)";
  $ctx.shadowBlur = 5;

  requestAnimationFrame(function() {
    loop($ctx);
  });
};

export default ({ avoidBackground = true }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      withStickers(ref.current, { avoidBackground });
    }
  }, [avoidBackground]);
  useEffect(() => {
    if (isPhone()) {
      document.documentElement.dataset.isPhone = true;
    }
  });
  return (
    <div className={styles.root} ref={ref}>
      <div className={styles.glitch} />
      <div className={styles.bg} />
      <div className={styles.underbg} />
      <div className={styles.stickers} />
    </div>
  );
};
