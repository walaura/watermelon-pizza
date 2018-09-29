const path = require('path');
const fs = require('fs');

const arrowSvg = fs.readFileSync(
	path.resolve(__dirname, '../..', 'static/res/arrow.svg')
);

const slide = ({ id, title, images, about, links }) => `
<section class="slide slide--${id}">
  <div class="slide__wrap">
    <header class="slide__title">
      <h2 class="slide__title__title">${title}</h2>
      <img class="slide__title__avi" src="/pf/${id}/avi.png" />
    </header>
    <div class="slide__text">
      ${about.map(a => `<p>${a}</p>`).join('')}
      ${links &&
				`
        <nav class="slide__text__nav">
          <ul>
            ${links
							.map(
								({ title, href }) =>
									`
                  <li><a href="${href}">
                    <span>${title}</span>
                    ${arrowSvg}
                  </a></li>
                  `
							)
							.join('')}
          </ul>
        </nav>
      `}  
    </div>
    ${images &&
			`
      <aside class="slide__pics">
        <ul>
          ${images
						.map(
							i =>
								`<li>
                  <img src="/pf/${id}/${i.url}" />
                </li>`
						)
						.join('')}
        </ul>
      </aside>
    `}
  </div>
  </section>
`;

const base = slides => `
<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="user-scalable=0, initial-scale=1.0" />

	<title>Laura González – Portfolio</title>
	<link rel="shortcut icon" href="res/image/mushroom.png" />
	<link rel="stylesheet" href="watermelon.css" />
</head>

<body>
	<nav class="nav">
    <ul>
    ${slides
			.map(
				({ id, title }) =>
					`
          <li><a href="#${id}">
            ${title}
          </a></li>
          `
			)
			.join('')}
		</ul>
	</nav>
	<main class="main">
    ${slides.map(slide).join('')}
	</main>
	<script>
		!function (w, e, l, p) {
			w.GoogleAnalyticsObject = l; w[l] || (w[l] = function () {
				(w[l].q = w[l].q || []).push(arguments)
			}); w[l].l = +new Date; p = e.createElement('script');
			var e = e.scripts[0]; p.src = '//www.google-analytics.com/analytics.js';
			e.parentNode.insertBefore(p, e)
		}(window, document, 'ga');

		ga('create', 'UA-60802592-1', 'auto');
		ga('require', 'displayfeatures');
		ga('send', 'pageview');
	</script>
	<script src="watermelon.js"></script>
</body>

</html>`;

module.exports = base;
