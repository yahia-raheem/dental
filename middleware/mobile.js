export default function(context) {
  let useragent = process.server
    ? context.req.headers["user-agent"]
    : navigator.userAgent;
  context.isMobile = /mobile/i.test(useragent);
  context.store.dispatch("general/setIsMobile", /mobile/i.test(useragent));
}
