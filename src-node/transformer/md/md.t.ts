export type Meta = {
  date: Date;
  title: string;
  desc: string;
  permalink: string;
};

export type Post = {
  htmlContent: string;
  meta: Meta;
  maybeCss: string;
};
