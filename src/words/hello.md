garbo

```css
& {
  background: #008080;
  font-size: 14px;
  font-family: Tahoma, verdana;
  font-smooth: never;
  -webkit-font-smoothing: none;
  -moz-font-smoothing: none;

  --color-highlight: cyan;
}

h1 {
  text-shadow: 2px 2px yellow;
  font-family: Georgia, serif;
}

article {
  color: #fff;
}

article-zone {
  margin-top: var(--basis-header-sp);
  & > :first-child {
    margin-top: 0;
  }
}

article-zone[data-depth="2"] {
  background: #fff;
  color: #000;
  border: 4px ridge grey;
  padding: var(--basis-padding);
}

article-zone[data-depth="3"] {
  background-color: #ffffea;
  padding: calc(var(--basis-padding) * 0.5);
  border: 2px outset grey;
}

h2 {
  border-bottom: 2px dashed cyan;
  color: #0000ff;
  text-shadow: 2px 2px #eee;
}
```

```json
{
  "title": "Cool, hey!",
  "date": "1776928438"
}
```

Trying out some quick blog hosting. Believe it or not this initial post is load-bearing. neccesary. without it nothing works lol

Not much from me this time around, if you are curious about how this works you should check out the [code](https://github.com/walaura/watermelon-pizza). Im gonna try to explain it because that way i get to try headings and bullets but honestly claude may do a better job than me

## whats all this then

The site is built on [parcel](https://parceljs.org). ~Always was~ It was on gatsby for a bit that was wild. Anyway its just a litle bundler that was around the last time i freshened up my coding skills. It's neat! You build your stuff like its the 90s raedogging html and js and it turns it into a 'modern' 'web' 'app'. they arent paying me to say this.

For the static part this was always easy, just some HTML. For this blog well guess what its fucking markdown. I got this little parcel plugin that takes the markdown files and 'converts' them into 'html pages' that then go on the normal parcel pipeline. it's neat!

For the metas...oh boy. So first of all, I vent a lot about how every website looks like signing up for a sensible healthcare plan now. It sucks, everything is beautiful and nothing is inspiring. I wanna blame vibe coding but that would erase the harms made by bootstrap being too good. Anyway, turns out my own website is also a bit of a looker and I can't commit to a cool charming aesthetic for too long because i'm deeply insecure SO each post gets custom css.

markdown lets you annotate stuff with yaml or something at the top. I started doing that but the parser google suggested doesnt have that. I wasnt super into the idea anyway so what i landed on is that on top of every markdown file I have this structure

````md
garbo

```css
& {
  background: red;
  font-family: Comic Sans haha funny
  color: yellow;
}

h1 {
  display: marquee
}
```

```json
{
  "title": "Cool, hey!",
  "date": "1776928438"
}
```

Yo im a blogpost
````

Including [this one](https://github.com/walaura/watermelon-pizza/blob/main/src/words/hello.md)! it's not fancy. I basically got two 'magic' code blocks as far as my parser sees. When reading a md file i basically go like

1. **do we have meta data?** if not, skip rendering - this is why i have some garbage at the top, great debugging tool.
2. **is this a css code block?** add it to the page. wrap it in the article wrapper using css nesting because now we can and also so i cant hack my header because limitation breeds creativity.
3. **is this a json block?** parse it and assume its the data or die trying (hey if i break my blog ill notice lol)

And parsing is linear so as soon as theres data its just regular parsing.

## these little blocksies

In a moment of enlightement i figured i could want boxes around my headings. Nesting is one of the hardest problems in computer science - alongside with getting any GPU to count the number of r in starberbwrirrrberry - but guess what turns out i don't have to! because all i do is hijack my headings to do this cursed-ass thing

```js
heading({ tokens, depth }) {
  const text = this.parser.parseInline(tokens);

  return `
    </article-zone-${depth}>
    <article-zone-${depth} class="article-zone">
      <h${depth}>
        ${text}
      </h${depth}>`;
}
```

Every time I make a heading I try to close the 'box' for the previous one in that level. I don't really give a shit if there's one already open and neither does your browser, it just works and Leverages The Web Platform™ by using their apis instead of reinventing the wheel in javascript.

Anyway then i can style these, it's pretty cool. i can also nest em, look:

### is this a good way to do this?

Fuck no but for this very specific set of purposes its doing great. But seriously this is some awful stuff. The joys of not needing to review your own code.

## why blog?

idk, posts get lost in the noise sometimes and i crave something more permanent?? im also doing some more creative stuff now like art and whatnot and it felt like a good time to dust off the site. maybe do weeknotes?

– l
