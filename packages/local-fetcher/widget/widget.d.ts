export type Widget<Data extends {}> = {
  name: string;
  fetchFromUrl: URL;
  unmangle: (string: string) => Promise<Data>;
};
