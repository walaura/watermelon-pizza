```css-glob
@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,slnt,wdth,wght,GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC@8..144,-10..0,25..151,100..1000,-200..150,27..175,323..603,25..135,649..854,-305..-98,560..788,416..570,528..760&display=swap');
```

```css
& {
  --basis-img-width: 100%;
  color: #343434;
}

em {
  opacity: 0.75;
}

.article-heading {
  background: #262626;
  color: white;
  padding: calc(var(--basis-padding) / 1);
  border-radius: 0.25em;
  margin-inline: calc(var(--basis-padding) / -1);
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0) 1px,
    rgba(0, 0, 0, 0.5) 2px,
    rgba(255, 255, 255, 0) 3px
  );

  date {
    color: #fc9922;
    font-weight: 700;
  }
}

h1,
h2 {
  font-family: "Roboto Flex";
  font-style: normal;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.01em;
  font-stretch: 75;
  font-variation-settings:
    "GRAD" -200,
    "XOPQ" 60,
    "XTRA" 376,
    "YOPQ" 79,
    "YTAS" 679,
    "YTDE" -162,
    "YTFI" 670,
    "YTLC" 524,
    "YTUC" 640,
    "slnt" 0,
    "opsz" 144;
}

h1 {
  text-transform: uppercase;
  display: flex;
  align-items: center;
  font-size: 1.75em;
}

article-zone {
  margin-inline: calc(var(--basis-padding) / -1);
  border: 1px dotted hsl(0 0 0 / 25%);
  padding: calc(var(--basis-padding) / 1);
  border-radius: 0.25em;
  margin-top: calc(var(--basis-padding) * 1.5);

  h2 {
    margin: calc((var(--basis-padding) / -1) - 1px);
    border-top-left-radius: 0.25em;
    border-top-right-radius: 0.25em;

    margin-bottom: var(--basis-padding);
    color: white;
    z-index: 10;
    font-size: 1.5em;
    padding-inline: calc(var(--basis-padding) / 1);
    padding-block: calc(var(--basis-padding) / 4);
    text-transform: uppercase;
    background:
      repeating-linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0) 1px,
        rgba(0, 0, 0, 0.25) 2px,
        rgba(255, 255, 255, 0) 3px
      ),
      linear-gradient(to left, #00ade2, #0a4d9e);
  }
}

figure {
  background: #aeb1b6;
  border-radius: 0.25em;
  overflow: hidden;
  margin-inline: calc(var(--basis-padding) / -1);
  margin-block: calc(var(--basis-padding) * 1.5);
  img {
    display: block;
  }
}

figure:not(:first-of-type) {
  figcaption {
    color: #fff;
    padding-inline: calc(var(--basis-padding) / 1);
    padding-block: calc(var(--basis-padding) / 4);
    text-align: start;
    &:before {
      content: url(data-url:pix/metroid/bumpy.svg);
      width: 13px;
      height: 13px;
      margin-inline-end: 0.5em;
      vertical-align: -10%;
    }
  }
}

figure:first-of-type {
  background: #0d4f71;
  position: relative;
  box-shadow: inset 0 0 1em 0.25em hsl(0 0 0 / 25%);

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    /*1px diag gradient white black*/
    background: repeating-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0) 1px,
      rgba(0, 0, 0, 1) 2px,
      rgba(255, 255, 255, 0) 3px
    );
    opacity: 0.35;
    z-index: 9;
  }
  img {
    mix-blend-mode: color-dodge;
    filter: grayscale(1) contrast(0.8);
  }
  figcaption {
    position: absolute;
    bottom: var(--basis-padding);
    left: var(--basis-padding);
    color: white;
    z-index: 10;
    font-size: 1.25em;
    text-shadow: 0 0.05em 0.05em rgba(0, 0, 0, 0.8);
    font-family: "Roboto Flex";
    font-style: normal;
    font-weight: 500;
    line-height: 1;
    font-stretch: 75;
    font-variation-settings:
      "GRAD" 0,
      "XOPQ" 80,
      "XTRA" 376,
      "YOPQ" 79,
      "YTAS" 679,
      "YTDE" -162,
      "YTFI" 738,
      "YTLC" 524,
      "YTUC" 640,
      "slnt" 0,
      "opsz" 144;
  }
}
```

```json
{
  "title": "Metroid Prime 4 belongs in a GameStop bargain bin ",
  "desc": "(affectionate)",
  "date": "1778064288"
}
```

_Trying to post weekly and I don’t know how to elaborate on this besides just telling you I’m old and nostalgic. Lemme try._

Full price packaged games today - especially from established houses such as Nintendo - are, for the most part, a solved problem. They are incredibly well engineered dopamine machines. Half of the slots at Vegas wish they could have the engagement loop of Zelda or Fallout. The fun never ends and you never wanna put them down.

They are objectively great! They have nailed the number bars to fill and the speed at which they fill, the exact times you can cycle content and gameplay per hour before its stale. They know how to distribute the story beats so it doesn’t get in the way It’s all so _so_ tight.

![its all so so corny lol](./pix/metroid/ms-halo.jpg?as=webp)

Games have come a long way since the PS2 era to evolve from 10 hour movie-like weekend romps into these perfectly engineered little endless toys you can’t put down. Always something new over the horizon to check out.

## Here comes Prime

Prime 4 is interesting because it’s trying to do a lot of this modern game stuff with its bike and disjointed story and collectibles and pretense of non-linearity yet it’s not very good at doing any of this in a competent manner.

It knows what type of game it’s supposed to be but it’s grasping at straws trying to fit that mold. Bit of a plato’s cave scenario.

There’s nothing specific the game does that screams this[^1], it’s the way its got a bunch of small little things that you don’t get to see in other games anymore.

The annoying mandatory crew NPCs blasting dialog while you try to fight, the last minute mandatory crystal collection, the waste of orchestrated bombastic music moments despite this being a portable game that will be mostly played on mute, the illusion of free movement that leads to dead ends if you call in the game’s bluff. The frigging bike. Missable collectibles. Getting away with a key location being the inside of a vagina. Checkpoints being sucky and arbitrary. Spotty player guidance.

Modern games know better and have optimized and sanded all of this away into a more polished product.

@@@

![Even the menu is period-fitting. looks like Halo 3](./pix/metroid/menu.jpg?as=webp)

## It’s the edges, stupid

Prime 4 captures an almost intentional roughness. It would have been a pretty average game in 2015 but coming out now means it should know better and yet it chooses not to. It could have had a quest log, and fast travel, and save before every room, traded the music budget for extra content, make the open world make sense with 120 little caves instead of 6, - throw combat challenges in there as filler - Let the player go anywhere at any point while reducing the punchiness of finding new abilities. make the crystals part of a big and complex skill tree because that’s what crystals are for.

But it doesn’t. These are all no brainer suggestions that have worked for thousands of games before and it chooses not to do any of this.

We live in a world full of connectivity and data. Everything is measurable and actionable and you’d be a fool not to, really. Nothing has rough edges anymore because we have gotten damn good at identifying them ahead of time, and we have collectively identified the most optimal ways of sanding those down. **Everything is optimized to perfection.** Every damn thing is an incredibly well engineered dopamine machine you can’t put down.

_As I write this theres an annoying little blue thing asking me if I wanna optimize this post with AI. Fuck no, you are going to read the same point stated four times and you are gonna like it._

Here comes Prime 4, it’s not quite a PS2 era 10 hour romp like maybe Prime was trying to be. It kinda knows it’s supposed to be more than that but doesn’t _know_ how to get there. It doesn’t challenge conventions so much as it doesn’t know how to follow them.

It would have been so unremarkable back in the PS3 era. Another 10 hour collectible filled shooter with wacky elements. Incredibly memorable highs (that vista at Fury Green), super forgettable midpoints (i struggle to remember the mines) $5 at the aforementioned bargain bin a month later.

But it’s 2026. there’s no bargain bin anymore. All games with a name like ‘Metroid’ attached are capital P Perfect[^2]. Even Zelda lasts 200 hours and you will love every single minute of them.

@@@

![Fury Green looks incredible btw](./pix/metroid/fry.jpg?as=webp)

## 11/10 IMO

As a “modern game” maybe it “doesn’t hold up” or it’s “dated” or whatever, thats what the internet says anyway. terrible value for money but everything is when you could play Roblox until you die and never stop seeing new stuff.

But compared against its bargain bin fodder siblings from 10-15 years ago... well, this is one of the absolute best Xbox 360 games ever released.
You’ll be done with it after 30 hours tops and you won’t last more than 2 on a single session, it’s not gonna keep you glued to the screen forever despite it’s cute little attempts to do so but I don’t think that’s _that_ unforgivable.

A lil’ chewy candy you can swallow for a world that mostly only manufactures vapes now.

NOTE: I haven’t yet played Resident Evil 9 yet which I think hits very similar notes. Waiting for a sale because I’m part of the problem.

[^1]: editor laura here letting you know im about to dump a list of specifics in the next para anyway

[^2]: this is probably less true if you enjoy soulslikes which i don’t
