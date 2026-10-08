```css
& {
  --color-highlight: #34138d;
  color: #343434;
}

em {
  opacity: 0.75;
}

hr {
  text-decoration: none;
  border-bottom: 1px dotted #ddd;
  height: 0px;
  margin-block: calc(var(--basis));
}

h1 {
    color: #34138d;
    font-family: "Finger Paint", sans-serif;
    text-transform: lowercase
}

h2 {
    font-family: "Finger Paint", sans-serif;
    color: #34138d;
    margin-top: 6em;
    display: inline-flex;
    position:relative;
    &:before {
      background: yellow;
      position: absolute;
      top:6;bottom:6;right:-3;left:-3;
      content:'';
      z-index: -1;
    }
}

.article-heading {
  color: #34138d;
  color: #fff;
  line-height: 1.1;
  text-align: center;

  date {
    color: black;
    opacity: .75
    font-weight: 100;
  }
}
```

```css-glob
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
```

```json
{
  "title": "Hey chat",
  "desc": "Lets talk",
  "date": "1791301515"
}
```

_I'm helping make the web awesome_ is what [this website used to say](https://laura.monster/old/8) at the very top. I got an itch for web development early back in the Flash days and man that has been a long and productive 15? 20? years. Talks, jobs, flame wars, friends, enemies, lovers, brief Twitter stardom. It's been a lot.

It's dawned on me that if you are still parasocially following me enough to keep up with my posts but not enough to ask it's probably _insanely hard to figure out what is going on with my life_ right now. I stopped posting about work, I made [a game about stacking burgers](https://store.steampowered.com/app/5140030/You_Should_Consider_Making_a_Burger_EX/). I'm on, like, a lot of walks and generally yeah like what the hell. What's going on. Is Salsa okay and so on and so forth.

## Laura the software engineer

Around 18 months ago I made an a now weirdly prophetic post about getting promoted as well as [gaining a cool scepter](https://bsky.app/profile/freezydorito.lol/post/3lhwbzwhibc25) and then went radio silent for a while. 

The scepter was cursed. Go figure.

At the time I took the role, growing a design systems team from the front felt like a dream come true, it knocked out all the boxes. I loved digital design and working out how to scale it through systems was a passion of min, and was a bit of an expert in the area got talks on this and everything. I was super ready for my next career leap and genuinely excited to tackle this challenge.

And then yeah the damn scepter was cursed. After a couple months of powering through what I initially chalked as a small initial disillusionment, these things happen, I ended up really stressed and really burned out, and eventually after some time on personal leave reflecting on what's next I decided it would be best to sever ties with my employer. That' alright on its own. Almost seven years of service, my linkedin was starting to get boring.

Since then I've been living off of savings and figuring out what's next and hunting for opportunities for these last cpl months and these are some realizations I've come to in that time

## Software Engineering the career

At the same time this was all happening, the rules for the entire field of software engineering were being rewritten. I have very much missed out on this whole AI thing which honestly sounds like a blessing from what I hear? 

I don't even wanna overindex on that because who the fuck wants to hear yet another AI take (i dont like it. there. thats the take) but also for this specific field it's like the 4th? 5th? crisis this decade? You know, with layoffs and forced RTO, and the forced WFH before that, and the virus that killed you if you left the house. It's all a lot to process. I don't think anybody has fully yet.

What I am kinda noticing is that across the board bolts are being tightened and there's less room for nonsense and hijinks and colors and shapes, which I greatly enjoy and vastly expanded room for filling tickets and fulfilling compliance regulations and drawing up data pipelines and filling forms and all this very important, critical stuff that just sucks ass.

Idk the work already moved from making cool brochure sites when I started to wrangling virtual machines to run node in so your css will compile for whatever fucked up techbro reason. We really lost the plot after Flash but point is, I'm finding it hard to go back to it. I don't think I can handle doing management, which is a bummer but whatever, and the everyday life of a modern software engineer sounds so weird to me.

## Software Engineering the scene

While _all that_ was happening I mostly faded out of the social scene after 2019. At first its because i worked on Charlie's frigging chocolate factory and suddenly to do a talk required talking to 89 different people, all about the same thing, 88 of them unfamiliar with the term 'javascript'.

Then 2020 came and yeah, well, you know.

Since I've been trying to reenter this scene but tyhe vibes feel off. It was insanely easy to be a cool technologist hype person in 2019 when every big tech company was doing little rainbow themed shit and giving away food and cool exciting innovations kept coming at a breakneck pace. This was a world where I _wanted_ the newest iPhone. I watched the damn Apple events and everything.

There was a naivety here. But you know what? It was shared between a lot of cool exciting people that were trying to make the world better. And it's really easy to drink the kool-aid when it's on tap on every floor.

It's been a long half decade but for the most part the naivety seems to be entirely intact which is absolutely great if it's intact for you right? Most of the people I hung with became bluecheck ai boosters and like whatever you do you but it sucks for me. That's not who I wanna be. 

My partner is huge at conferences and I have tagged to so many only to end each one on a breakdown. Iirc the previous post in this blog is when I called it quits and grabbed an early flight home It's all a bit hazy.

## Mid 2020-s crisis

So, burnt out during one of the most transformative times in your field since the Internet, and with some savings to spare from your last job, felt like the perfect time to take a career break. And I'm doing just that! I probably don't have to tell you the many wonders of Not Working. it's pretty neat.

It's kinda crazy how slowly and quickly your brain will readjust to a new reality and perspective. Wild that I gave so much of a shit about frontend engineering. Literally who cares. Copypaste the CSS Figma gives you and get it working on the last version of Chrome. Done. If you work with a psychopath that uses Firefox they can fix it in there. Brand changed? Let's be real your little page is already dead content by then. Do I sound pissy? Probs. That's what burnout does to you lol.

So what now? Well, I think as a kid, barring the silly stuff like astronaut my top 3 dream careers were something like designer/architecture/gamedev.

Architecture requires proper studies and stuff and buildings take forever to get done so that's not a big dream

Design I got to do. I'm a better frontend engineer than designer and that's how I ended up doing that instead but it's been insanely helpful to have the background through the last 20 years

Games is one of those 'maybe in another life' things i had burned in my mind. After all I had a successful career in a close enough field that pays better so no need to regret this. But here's the fun twist, from where I'm standing I probs no longer have a successful career or the will to pursue one in that field so guess what!!!! 

## Salsa's Shack

Along with my partner I'm a co-owner of [Salsa's Shack](https://salsashack.co.uk/). This was the silly name we had for our game boy repair side hustle but now it's, like, a real business. I have some savings to keep this going for another 18 months, more if we start pulling revenue, so this is my full time job now? it's not my first time being my own boss but it is my first time being my own client if that makes sense. We do games we wanna see in the world and we mod consoles that we think look cool (We also take requests tho! dm on ebay)

I'm spending my time now making games and just hanging and learning. It feels amazing to be a noobie again and London has an incredible community that has me meeting new people again and taking me off the rut and negativity spirals I was finding myself in. (Team, I'm not gonna lie, stuff was _rough_).

More importantly I'm having _fun_. I've always been very good at finding fun in making all kinds of boring software but it's just easy when the product you are building is, like, actually meant to surprise and delight and fuck around with the end user. 

Remaking the Burger game had huge personal lore implications and honestly I'm just gonna assume if you are still reading this you have also read the artbook where I got into more of the detail. if not, go buy it. I need your money to fund the next game.

## Ah it's still going i see

I'm actually putting up this weirdly long personal rambly post because you know, It's kind of a new era in a way. Trying out not-a-frontend-engineer laura for size. It's good to let go of some of that baggage.

There's also a lot about the last 18 months I haven't been able to tell or talk straight about for a number of reasons as it was happening and it's been slowly weighting on me so there now you are up to speed. Phew. more baggage gone.

This all felt weirdly necessary. Maybe it was more necessary to write than for it to be read Idk. My mind is a bit wacky lately. Always was but I'm a bit more self conscious of it now. Always loved the wacky but now hoping the consciousness goes away over time.

And finally, as you know from the artbook you of course purchased. There's a proper game I'm really excited about. It's got a title. You have seen peeks on bsky, and it's really coming along and I really wanna introduce it properly. This is kind of my baby - At least between gb repairs and seasonal updates to the burger - It's got a story to tell, it covers a segment of games that not many folks are really making that much anymore, I'm gonna fight for it to get published and seen and I'm really frigging energized about it. This is it, the big one, the full time endeavor. 

More to come soon now. I hope you come along for the ride to see this happen. Worst case scenario, we get some decent laughs along the way.

best,<br/>
-l