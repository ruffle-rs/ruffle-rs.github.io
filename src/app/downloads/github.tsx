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
    let avm2_report_asset_id: number | undefined = undefined;
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
  const latest = releases.find(release => release.avm2_report_asset_id !== undefined);
  if (!latest?.avm2_report_asset_id) {
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
  const issue = await octokit.rest.issues.get({
    owner: repository.owner,
    repo: repository.repo,
    issue_number: 310,
    headers: {
      accept: "application/vnd.github.html+json",
    },
  });
  const topLevelContent = issue.data.body_html;
  if (!topLevelContent) {
    return 0;
  }
  const topLevelRoot = parse(topLevelContent);
  let totalItems = topLevelRoot.querySelectorAll("input.task-list-item-checkbox").length;
  let completedItems = topLevelRoot.querySelectorAll("input.task-list-item-checkbox:checked").length;
  const linkedIssues = topLevelRoot.querySelectorAll(`a[href^='https://github.com/${repository.owner}/${repository.repo}/issues/']`);
  for (let i = 0; i < linkedIssues.length; i++) {
    const issue = linkedIssues[i];
    const issue_href = issue.getAttribute("href");
    const issue_number = issue_href ? parseInt(issue_href.replace(`https://github.com/${repository.owner}/${repository.repo}/issues/`, '')) : Number.NaN;
    if (!Number.isNaN(issue_number)) {
      const linkedIssue = await octokit.rest.issues.get({
        owner: repository.owner,
        repo: repository.repo,
        issue_number: issue_number,
        headers: {
          accept: "application/vnd.github.html+json",
        },
      });
      const linkedContent = linkedIssue.data.body_html;
      if (linkedContent) {
        const linkedRoot = parse(linkedContent);
        totalItems += linkedRoot.querySelectorAll("input.task-list-item-checkbox").length;
        completedItems += linkedRoot.querySelectorAll("input.task-list-item-checkbox:checked").length;
      }
    }
  }
  return Math.round(completedItems/totalItems*100);
}
