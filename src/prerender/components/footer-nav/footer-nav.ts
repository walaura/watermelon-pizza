import { html } from "#prerender/sys/tags.ts";

export type FooterNavIcon = "back" | "fwd" | "menu";

export type FooterNavLink = {
  icon?: FooterNavIcon;
  link: string;
  title: string;
  brow?: string;
  isCollapsed?: boolean;
  hasSquiggle?: boolean;
};

const getIcon = (icon: FooterNavIcon | null | undefined) => {
  if (!icon) return "";
  return {
    back: html`<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentcolor"
      viewBox="0 0 16 16"
    >
      <path d="M1 7h14v1H1z" />
      <path d="M4 5 1 8l3 2-1 1-3-3 3-4z" />
    </svg>`,
    fwd: html`<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentcolor"
      viewBox="0 0 16 16"
    >
      <path d="M1 7h14v1H1z" />
      <path d="m12 5 3 3-3 2 1 1 3-3-3-4z" />
    </svg>`,
    menu: html`<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentcolor"
      viewBox="0 0 16 16"
    >
      <path d="M1 7h14v1H1zm0 4h14v1H1zm0-8h14v1H1z" />
    </svg>`,
  }[icon];
};

const makeFooterNavLink =
  (shouldFlip: boolean) =>
  ({
    link,
    title,
    icon,
    brow,
    hasSquiggle,
    isCollapsed,
  }: FooterNavLink) => html`
    <a
      href="${link}"
      title="${(brow ? brow + " / " : "") + title}"
      class="footer-link${shouldFlip ? " footer-link--flip" : ""}${hasSquiggle
        ? " footer-link--squiggle"
        : ""}"
    >
      ${getIcon(icon)}
      ${isCollapsed !== true
        ? html`<div>
            ${brow ? html`<span>${brow}</span>` : ""}
            <strong>${title}</strong>
          </div>`
        : ""}
    </a>
  `;

export const footerNav = ({
  linksEnd = [],
  linksStart = [],
}: {
  linksEnd: FooterNavLink[];
  linksStart: FooterNavLink[];
}) => {
  return html`<link
      rel="stylesheet"
      href="../prerender/components/footer-nav/footer-nav.css"
    />
    <footer>
      <div class="footer-actual 🧃-glitchbox">
        ${linksStart.map(makeFooterNavLink(false)).join("")}
        <div class="🧃-glitchbox-flex"></div>
        ${linksEnd.map(makeFooterNavLink(true)).join("")}
      </div>
    </footer>`;
};
