garbo

```css
& {
  background: #00202D;
  color: #fff;
  font-family: Nunito, sans-serif;
  font-optical-sizing: auto;
  font-size: 1.2rem;

  --basis-img-width: 100%;
  --color-highlight: #F797C7;
}

p {
  margin-right: 1.5em;
}

figure {
  padding:1.5em;
  background: #759904;
  color: #fff;
  border-radius:1em;
  float: right;
  width: 16em;
  max-width:60vw;
  margin-bottom:2em;
  margin-inline-end: -5em;
  margin-inline-start: 1em;
  animation: 5s ease-in infinite alternate-reverse both pulse;
  img {
    margin-bottom:1em;
  }
}

article-zone-2 {
  background:#fff;
  color: #00202D;
  border-radius: 1em;
  padding: 1.25em;
  padding-block-end: 2em;
  padding-top:0;
}

article-zone-3 {
  background:#fff;
  color: #fff;
  border-radius: 1em;
  padding:2rem 1rem;
  padding-top:0;
  background: #A794E3;
  margin-inline-start: -3rem;
  padding-inline-start: 3rem;
  font-size: .8em;
  overflow: hidden;

  h3 {
    border-bottom: 2px solid #fff;
    padding-block:1em .5em;
    margin-inline: -4rem;
    padding-inline: 1rem;
    padding-inline-start: 4rem;
    text-transform: uppercase;
    font-weight:900;
  }
}

h2 {
  background: #169EA4;
  margin-inline: -3rem;
  border-radius:10em;
  padding:.75em 2em;
  text-align: center;
  margin-bottom: .5em;
  text-transform:uppercase;
  margin-top: 3em;
  position:relative;
  top:-1em;
  font-weight:1000;
  animation: 6s ease-in .2s infinite alternate-reverse both pulse;
}

article-zone-2, h1, h2, article-zone-3, figure {
  box-shadow: .25em .25em 0 0 hsla(0 0 0 / 25%);
}

* {
    font-weight: 600;
}
```
```css-glob
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

@keyframes pulse {
  from {
    transform: translateY(-.25rem)
  }
  to {
    transform: translateY(.25rem)
  }
}
```

```json
{
  "title": "ok so i lied lol i do know how to make these",
  "desc": "Keep reading for tales on bmp rendering, performance, lies, and bad decisions",
  "date": "1777498690",
  "draft": true
}
```

## lemme paint a picture here

When i started this blog, one big new Thing You Have To Do as part of a website[^1] that wasn't there before is pictures for social media. You know them, you love them they are movie-shaped for some reason, anyway, it looks real bad when you don't have one but nobody says they have to be related to the post. 

![TBF the fact that theres a picture saying i don't know how to make them is already a big red flag obviously i know how to make them the picture is there isn't it](./pix/okay-i-lied-tweet.png?as=webp)

I wanted my dopamine for releasing something into the open so i grabbed an envelope i had at hand[^2] and wrote this on it, uploaded it, everything was fine. I even found a purple sharpie thats [on brand](https://github.com/walaura/watermelon-pizza/blob/25794b41ba5f876a9daec8b7b2db01acede8c11b/README.md). great stuff

This was always temporary ofc. I used to be [big in the world of generating images on the fly](https://thenextweb.com/news/this-twitter-bot-invents-the-most-heinous-flavors-of-fanta-ever). At the time I was fundamentally jerry rigging together infrastructure for e2e testing of websites that took browser screenshots paired with a custom made 'website' that just happened to look like the image i wanted.

Back in 2018 i considered this to be clowny, absurd, a massive waste of resources freely provided to me by ZIRP-era tech companies and in general it was a lil like it did the job good enough for me you know but surely real experts use image libraries or something. 

Anyway time to check the state of the art on og images.

## It's 2026 and they are screenshotting the fucking websites
The state of the art seems to be split between this [thing from Vercel](https://vercel.com/docs/og-image-generation) that pulls 1,160 dependencies to generate a SVG for you. **Which is not even the hard part** svgs are code you can just write them jesus fuck anyway this is all implied to go to a wasm port of [resvg](https://github.com/linebender/resvg)[^3] which i feel is only not a web browser on a technicality but fair enough. 

You should use this btw, it's really solid stuff. It'll do everything you want. There's a reason it's beloved, looks great. i would use it on somebody else's website it's just for this one it seemed like Work rather than Fun

### Lil aside: what is in an image?
Most images contain a very dense bit-like representation of the picture as pixels or blocks or in general just 'data'. Think `0101` as a 4x1 picture alternating black and white.

SVG is different in that it's closer to a traditional website. You can open them in a text editor and see markup and you can generally [read it](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Basic_shapes). They may not make a lot of sense if they are compressed but in general they are fine.

SVGs generally need to be 'converted' into 'real' images by your computer before seeing them, sadly for og images most providers want me to do this ahead of time instead of them or the users computer doing it. I kinda figured you could just use svg by now lol. You can on favicons.


## What options do we have?

One of my white whale projects


[^1]: lots of things i don't have to do anymore tho which is awesome! this barely works on mobile, modern css negates the need for pirating photoshop and i don't really have a stick up my butt on code correctness so this is all being fun for once.

Oh yeah and Netlify is dealing with https, that seems to work so that's awesome.

[^2]: its 2026 i don't really have access to Paper, per se.

[^3]: this will turn out to be weirdly prophetic