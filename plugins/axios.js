import { cacheAdapterEnhancer } from "axios-extensions";
import LRU from "lru-cache";
const ONE_HOUR = 1000 * 60 * 60;

export default function({ $axios, ssrContext }) {
  const defaultCache = process.server
    ? ssrContext.$axCache
    : new LRU({ maxAge: ONE_HOUR });

  const defaults = $axios.defaults;
  defaults.adapter = cacheAdapterEnhancer(defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: "useCache",
    defaultCache
  });
}
