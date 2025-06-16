const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");
const { Octokit } = require("octokit");
const { createTokenAuth } = require("@octokit/auth-token");

const owner = "ruffle-rs";
const repo = "ruffle";
const assetName = "avm2_report.json";
const outputDir = path.resolve(__dirname, "..", "public");
const outputFile = path.join(outputDir, assetName);

function createOctokit() {
  if (process.env.GITHUB_TOKEN) {
    const auth = createTokenAuth(process.env.GITHUB_TOKEN);
    return new Octokit({ authStrategy: auth });
  } else {
    console.warn(
      "Please provide a GitHub Personal Access Token via the GITHUB_TOKEN environment variable.",
    );
    return new Octokit();
  }
}

async function downloadAsset(url, outputPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download asset: ${res.statusText}`);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const nodeStream = Readable.from(res.body);
  const fileStream = fs.createWriteStream(outputPath);

  await new Promise((resolve, reject) => {
    nodeStream.pipe(fileStream);
    nodeStream.on("error", reject);
    fileStream.on("finish", resolve);
  });
}

async function downloadAVM2Report() {
  try {
    const octokit = createOctokit();

    const { data: releases } = await octokit.rest.repos.listReleases({
      owner,
      repo,
      request: { next: { revalidate: 1800 } },
      per_page: 7,
    });

    const asset = releases
      .flatMap((release) => release.assets)
      .find((a) => a.name === assetName);

    if (!asset) throw new Error(`No release contains asset "${assetName}"`);

    await downloadAsset(asset.browser_download_url, outputFile);

    console.log(`Downloaded ${assetName} from latest release to ${outputFile}`);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

(async () => {
  await downloadAVM2Report();
})();
