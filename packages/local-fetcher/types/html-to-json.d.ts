declare module "html-to-json" {
  import type { Cheerio, CheerioAPI } from "cheerio";
  export function test(string: string): void;

  export type Method<T = any> = (doc: Cheerio<any>) => T | Promise<T>;

  export function createMethod<T = any>(fn: Method<T>): Method<T>;

  export function parse<T = any>(html: string, method: Method<T>): Promise<T>;

  export function batch<T = any>(
    html: string,
    methods: Record<string, Method<any>>,
  ): Promise<T>;
}
