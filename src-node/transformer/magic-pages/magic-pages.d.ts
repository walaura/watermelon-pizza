export type MagicPage = {
  render: () => Promise<{
    type: string;
    content: string;
  }>;
};
