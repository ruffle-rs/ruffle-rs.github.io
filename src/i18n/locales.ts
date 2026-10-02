import { readdirSync, readFileSync } from "fs";
import { basename, resolve } from "path";

export const defaultLocale = "en-US";

export function getLocales(): { code: string; name: string }[] {
  const dir = resolve(process.cwd(), "messages");
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const code = basename(f, ".json");
      const messages = JSON.parse(
        readFileSync(resolve(dir, f), "utf-8"),
      ) as Record<string, string>;
      return { code, name: messages["locale.name"] ?? code };
    });
}
