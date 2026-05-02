import { html } from "#prerender/sys/tags.ts";

export const footerNav = ({
  accessoryEnd = "",
  backHref = "/",
  backHrefTitle,
}: {
  backHref?: string;
  accessoryEnd?: string;
  backHrefTitle?: string;
}) => {
  return html`<link
      rel="stylesheet"
      href="../prerender/components/footer-nav/footer-nav.css"
    />
    <footer>
      <div class="footer-actual 🧃-glitchbox">
        <a
          href="${backHref}"
          class="footer-bk"
        >
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
          ${backHrefTitle ? html`<span>${backHrefTitle}</span>` : ""}
        </a>
        <div class="🧃-glitchbox-flex"></div>
        ${accessoryEnd}
      </div>
    </footer>`;
};
