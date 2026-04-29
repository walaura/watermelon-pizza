export type FetchFrom = [URL, RequestInit];

export type Widget<Name extends string, Data extends {}> = {
  name: Name;
  fetchFrom: FetchFrom;
  unmangle: (string: string) => Promise<Data>;
};

export type HydratedWidgetFor<W extends Widget<string, {}>> =
  | {
      data: Awaited<ReturnType<W["unmangle"]>>;
      name: W["name"];
      error: false;
    }
  | {
      name: W["name"];
      error: true;
    };
