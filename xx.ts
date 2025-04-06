import path from "path";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getAnimeList(params?: { page?: number | null }): Promise<any[]> {
  const page = params?.page ?? null;
  const url = page
    ? `https://ww1.anoboy.app/page/${page}`
    : "https://ww1.anoboy.app";

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
    "Upgrade-Insecure-Requests": "1",
  };

  try {
    const res = await fetch(url, { headers });
    const text = await res.text();
    const hasil: any[] = [];

    // TODO: find the img src like this: <img decoding="async" src="/img/upload/01as .jpg"/> use regex 
    const regex = /img[^>]+src="([^"]+)"[^>]*>/g;

    const matches = text.matchAll(regex);
    for (const match of matches) {
      const imgSrc = match[1];
      hasil.push({
        img: decodeURIComponent(url + imgSrc),
        title: decodeURIComponent(path.basename(imgSrc).replace(/.jpg/g, "").replace(/01as-/g, "")),
      });
    }

    const finalResult = hasil.filter((item) => item.img.includes("img/upload/01as-"));
    console.log(finalResult);
    return finalResult;
  } catch (err) {
    console.error("Error fetching page:", err);
    return [];
  }
}

getAnimeList();

