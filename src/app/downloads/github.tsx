import { createTokenAuth } from "@octokit/auth-token";
import { createUnauthenticatedAuth } from "@octokit/auth-unauthenticated";
import {
  AVM2Report,
  DownloadKey,
  FilenamePatterns,
  GithubRelease,
  maxNightlies,
  ReleaseDownloads,
  repository,
} from "@/app/downloads/config";
import { Octokit } from "octokit";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

function createGithubAuth() {
  if (process.env.GITHUB_TOKEN) {
    return createTokenAuth(process.env.GITHUB_TOKEN);
  } else {
    return createUnauthenticatedAuth({reason: "Please provide a GitHub Personal Access Token via the GITHUB_TOKEN environment variable."});
  }
}

export async function getLatestReleases(): Promise<GithubRelease[]> {
  const octokit = new Octokit({ authStrategy: createGithubAuth });
  try {
    const releases = await octokit.rest.repos.listReleases({
      per_page: maxNightlies + 2, // more than we need to account for a possible draft release + possible full release
      request: { next: { revalidate: 1800 } },
      ...repository,
    });
    const result = [];
    let avm2_report_asset_id = 0;
    for (const release of releases.data) {
      const downloads: ReleaseDownloads = {};
      for (const asset of release.assets) {
        if (asset.name === "avm2_report.json") {
            avm2_report_asset_id = asset.id;
        }
        for (const [key, pattern] of Object.entries(FilenamePatterns)) {
          if (asset.name.indexOf(pattern) > -1) {
            downloads[key as DownloadKey] = asset.browser_download_url;
          }
        }
      }

      result.push({
        id: release.id,
        name: release.name || release.tag_name,
        prerelease: release.prerelease,
        url: release.html_url,
        downloads,
        avm2_report_asset_id,
      });
    }
    return result;
  } catch (error) {
    console.warn("Couldn't get GitHub releases", error);
    return [];
  }
}

export async function getWeeklyContributions(): Promise<
  RestEndpointMethodTypes["repos"]["getCommitActivityStats"]["response"]
> {
  const octokit = new Octokit({ authStrategy: createGithubAuth });
  return octokit.rest.repos.getCommitActivityStats(repository);
}
export async function fetchReport(): Promise<AVM2Report | undefined> {
  const releases = await getLatestReleases();
  const latest = releases.find(release => release.avm2_report_asset_id !== 0);
  if (!latest) {
    return;
  }
  const octokit = new Octokit({ authStrategy: createGithubAuth });
  const asset = await octokit.rest.repos.getReleaseAsset({
    owner: repository.owner,
    repo: repository.repo,
    asset_id: latest?.avm2_report_asset_id,
    headers: {
      accept: "application/octet-stream",
    },
    request: {
      parseSuccessResponseBody: false, // required to access response as stream
    },
  });
  // After https://github.com/octokit/request.js/pull/602, when parseSuccessResponseBody is false,
  // the data is a ReadableStream, but the type is set incorrectly. This converts to the proper type.
  return await new Response(asset.data as unknown as ReadableStream).json();
}
