import cheerio from "cheerio";

export default function extractLocation(html: Buffer): ?string {
  let $ = cheerio.load(html);

  let refresh = $("meta[http-equiv='refresh']").attr("content");
  if (!refresh) {
    // meta refresh is required
    return;
  }

  let canonical = $("link[rel='canonical']").attr("href");
  return canonical;
}
