import cheerio from "cheerio";

export default function extractLocation(html: Buffer): ?string {
  const $ = cheerio.load(html);

  const refresh = $("meta[http-equiv='refresh']").attr("content");
  if (!refresh) {
    // meta refresh is required
    return undefined;
  }

  const canonical = $("link[rel='canonical']").attr("href");
  return canonical;
}
