export type MagicPage = {
  route: string;
  render: () => Promise<{
    type: string;
    content: string;
  }>;
};
