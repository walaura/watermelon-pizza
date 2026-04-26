export type FetchFrom = [URL, RequestInit];

export type Widget<Name extends string, Data extends {}> = {
  name: Name;
  fetchFrom: FetchFrom;
  unmangle: (string: string) => Promise<Data>;
};
