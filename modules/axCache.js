import LRU from "lru-cache";

export default function(_moduleOptions) {
  const ONE_HOUR = 1000 * 60 * 60;
  const axCache = new LRU({
    maxAge: ONE_HOUR,
    max: 500,
    length: function(n, key) {
      return n * 2;
    }
  });

  this.nuxt.hook("vue-renderer:ssr:prepareContext", ssrContext => {
    ssrContext.$axCache = axCache;
  });
}
