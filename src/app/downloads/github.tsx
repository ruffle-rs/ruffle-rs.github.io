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
import { parse } from "node-html-parser";

function createGithubAuth() {
  if (process.env.GITHUB_TOKEN) {
    return createTokenAuth(process.env.GITHUB_TOKEN);
  } else {
    return createUnauthenticatedAuth({
      reason:
        "Please provide a GitHub Personal Access Token via the GITHUB_TOKEN environment variable.",
    });
  }
}

function throwBuildError() {
  throw new Error("Build failed");
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
    let avm2_report_asset_id: number | undefined = undefined;
    for (const release of releases.data) {
      const downloads: ReleaseDownloads = {};
      for (const asset of release.assets) {
        if (asset.name === "avm2_report.json") {
          avm2_report_asset_id = asset.id;
        }
        for (const [key, pattern] of Object.entries(FilenamePatterns)) {
          if (pattern && asset.name.indexOf(pattern) > -1) {
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
  const latest = releases.find(
    (release) => release.avm2_report_asset_id !== undefined,
  );
  if (!latest?.avm2_report_asset_id) {
    throwBuildError();
    return;
  }
  const octokit = new Octokit({ authStrategy: createGithubAuth });
  const asset = await octokit.rest.repos.getReleaseAsset({
    owner: repository.owner,
    repo: repository.repo,
    asset_id: latest.avm2_report_asset_id,
    headers: {
      accept: "application/octet-stream",
    },
    request: {
      parseSuccessResponseBody: false, // required to access response as stream
    },
  });
  // According to https://github.com/octokit/types.ts/issues/606, when parseSuccessResponseBody is false,
  // the type is set incorrectly. This converts to the proper type.
  return await new Response(asset.data as unknown as ReadableStream).json();
}

export async function getAVM1Progress(): Promise<number> {
  const octokit = new Octokit({ authStrategy: createGithubAuth });
  const issues = await octokit.rest.issues.listForRepo({
    owner: repository.owner,
    repo: repository.repo,
    labels: "avm1-tracking",
    state: "all",
    per_page: 65,
    headers: {
      accept: "application/vnd.github.html+json",
    },
  });
  let totalItems = 0;
  let completedItems = 0;
  for (const issue of issues.data) {
    const topLevelContent = issue.body_html;
    if (!topLevelContent) {
      continue;
    }
    const topLevelRoot = parse(topLevelContent);
    totalItems += topLevelRoot.querySelectorAll(
      "input.task-list-item-checkbox",
    ).length;
    completedItems += topLevelRoot.querySelectorAll(
      "input.task-list-item-checkbox:checked",
    ).length;
  }
  if (totalItems < 3348) throwBuildError();
  return Math.round((completedItems / totalItems) * 100);
}
