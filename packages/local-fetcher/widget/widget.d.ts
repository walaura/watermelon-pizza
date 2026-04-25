export type FetchFrom = [URL, RequestInit];

export type Widget<Data extends {}> = {
  name: string;
  fetchFrom: FetchFrom;
  unmangle: (string: string) => Promise<Data>;
};
