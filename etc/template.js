const make = count => {
  return `
    <div>hey welcome to the time capsule</div>

    <div>${Array.from(Array(count).keys())
      .map(index => `<a href="${index + 1}/index.html">${index + 1}</a>`)
      .join("")}</div>

    <style type="text/css">
      :root {
        background: black;
        color: white;
        font-family: monospace;
      }
      body {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      a {
        color: inherit;
        padding: 2em;
        display: inline-block;
        margin: 1em 0.5em;
        font-weight: bold;
        background: white;
        color: black;
      }
    </style>
  `;
};

module.exports = make;
