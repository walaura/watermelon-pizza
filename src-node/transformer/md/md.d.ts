export type Meta = {
  date: Date;
  title: string;
  desc: string;
  permalink: string;
  filename: string;
  isDraft: boolean;
};

export type Post = {
  htmlContent: string;
  meta: Meta;
  maybeCss: string | null | undefined;
  maybeGlobalCss: string | null | undefined;
};
