import { createTokenAuth } from "@octokit/auth-token";
import { createUnauthenticatedAuth } from "@octokit/auth-unauthenticated";
import {
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
    for (const release of releases.data) {
      const downloads: ReleaseDownloads = {};

      for (const asset of release.assets) {
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
