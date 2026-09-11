import { execSync } from "child_process";
import { readdirSync, rmSync, cpSync, mkdirSync } from "fs";
import { basename, resolve } from "path";

const DIST_DIR = "dist";
const DEFAULT_LOCALE = "en-US";

rmSync(DIST_DIR, { recursive: true, force: true });
mkdirSync(DIST_DIR);

const locales = readdirSync("messages")
  .filter((f) => f.endsWith(".json"))
  .map((f) => basename(f, ".json"));

for (const locale of locales) {
  console.log(`==> Building locale: ${locale}`);

  execSync("npm run build", {
    stdio: "inherit",
    env: { ...process.env, NEXT_PUBLIC_BUILD_LOCALE: locale },
  });

  if (locale === DEFAULT_LOCALE) {
    cpSync("out", DIST_DIR, { recursive: true });
  } else {
    const dest = resolve(DIST_DIR, locale);
    mkdirSync(dest, { recursive: true });
    cpSync("out", dest, { recursive: true });
  }
}

console.log(`==> Done. Output in ${DIST_DIR}/`);
