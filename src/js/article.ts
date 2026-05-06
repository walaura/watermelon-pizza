const footnotes = [
  ...(document.querySelectorAll(
    "article sup:has(a[data-footnote-ref]) a",
  ) as NodeListOf<HTMLAnchorElement>),
];

for (const footnote of footnotes) {
  const link = new URL(footnote.href).hash;

  const wwindow = document.createElement("div");
  const window = document.createElement("div");
  const text = document.querySelector(link)?.textContent.trim();
  if (!text) {
    continue;
  }
  wwindow.innerText = text.substring(0, text.length - 1).trim();
  window.appendChild(wwindow);
  footnote.parentElement?.append(window);
}

const styles = document.createElement("style");
styles.innerHTML = `
    @container anchored(fallback: flip-inline) {
        div{
            --footnote-pop-x: 100%;
        }
    }
    @container anchored(fallback: flip-block) {
        div{
            --footnote-pop-y: 0;
        }
    }
`;

document.body.appendChild(styles);
