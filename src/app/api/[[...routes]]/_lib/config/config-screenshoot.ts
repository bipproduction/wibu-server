import { Context } from "elysia";
import fs from "fs/promises";
import path from "path";

export async function configScreenshot(c: Context) {
  const { params, set } = c;
  const { name, namespace } = params;

  const screenshotPath = path.join(
    `/var/www/projects/${name}/${namespace}/current/screenshot.png`
  );

  try {
    const screenshot = await fs.readFile(screenshotPath);
    set.headers["Content-Type"] = "image/png";
    return screenshot;
  } catch (error) {
    console.error("Screenshot not found, using fallback:", error);

    const fallbackPath = path.join(process.cwd(), "public/no-image.svg");

    try {
      const fallback = await fs.readFile(fallbackPath);
      set.headers["Content-Type"] = "image/svg+xml";
      return fallback;
    } catch (fallbackError) {
      console.error("Fallback image not found:", fallbackError);
      set.status = 404;
      return "Image not found";
    }
  }
}
