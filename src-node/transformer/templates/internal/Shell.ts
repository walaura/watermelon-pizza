export const Shell = ({
  head = "",
  title,
  accessory = "",
  body = "",
  backHref = "/"
}: {
  backHref?: string;
  head?: string;
  title: string;
  accessory?: string;
  body: string;
}) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="user-scalable=0, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="shortcut icon" href="/src/mushroom.png" />
    <link rel="stylesheet" href="/src/css/words.css" />
    <link
      href="/src/rss.xml"
      rel="alternate"
      type="application/rss+xml"
      title="Blog RSS feed"
    />
    ${head}
  </head>

  <body>
    <header>
      <div class="header-innie">
        <a href="${backHref}" class="header-bk">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 47 17"
            alt="Back"
            title="Back"
          >
            <path
              fill="currentColor"
              d="M9.9 1.414 3.812 7.5H47v2H3.843l6.056 6.057-1.414 1.414L0 8.485 8.485 0z"
            />
          </svg>
        </a>
        ${accessory}
      </div>
    </header>
    ${body}
  </body>
</html>`;
