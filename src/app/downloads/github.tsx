import { createTokenAuth } from "@octokit/auth-token";
import { createUnauthenticatedAuth } from "@octokit/auth-unauthenticated";
import {
  AVM2Report,
  DownloadKey,
  FilenamePatterns,
  GithubRelease,
  maxMajor,
  maxMinor,
  maxNightlies,
  ReleaseDownloads,
  repository,
} from "@/app/downloads/config";
import { Octokit } from "octokit";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { parse } from "node-html-parser";
import semver from "semver/preload";
import { components } from "@octokit/openapi-types";

const octokit = new Octokit({ authStrategy: createGithubAuth });

const requestCache = {
  // Set cache to 30 min to prevent rate limiting during development
  request: { next: { revalidate: 1800 } },
};

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

function mapRelease(release: components["schemas"]["release"]): GithubRelease {
  const downloads: ReleaseDownloads = {};
  let avm2_report_asset_id: number | undefined = undefined;
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

  return {
    id: release.id,
    name: release.name || release.tag_name,
    prerelease: release.prerelease,
    url: release.html_url,
    tag: release.tag_name,
    downloads,
    avm2_report_asset_id,
  };
}

export async function getLatestRelease(): Promise<GithubRelease> {
  try {
    const response = await octokit.rest.repos.getLatestRelease({
      ...requestCache,
      ...repository,
    });
    return mapRelease(response.data);
  } catch {
    // There's no stable release, get the latest nightly.
  }

  const releases = await octokit.rest.repos.listReleases({
    per_page: 1,
    ...requestCache,
    ...repository,
  });
  return mapRelease(releases.data[0]);
}

export async function getLatestNightlyReleases(): Promise<GithubRelease[]> {
  try {
    const releases = await octokit.rest.repos.listReleases({
      // We have to take into account possible stable releases here
      per_page: maxNightlies + 4,
      ...requestCache,
      ...repository,
    });
    const result = [];
    for (const release of releases.data) {
      if (!release.prerelease) {
        // Filter out stable releases
        continue;
      }
      result.push(mapRelease(release));
    }
    return result;
  } catch (error) {
    console.warn("Couldn't get GitHub releases", error);
    return [];
  }
}

export async function getLatestStableReleases(): Promise<GithubRelease[]> {
  let newestMajor = null;

  // Map representing releases from the current major version:
  //   `major.minor` -> `major.minor.patch`
  // We want to ignore older patches and show last X minor versions.
  const currentMajorReleases = new Map();

  // Map representing releases from older major versions.
  //   `major` -> `major.minor.patch`
  // We ignore here minor and patch versions, and
  // gather the newest release per each major.
  const olderMajors = new Map();

  for (
    let page = 1;
    currentMajorReleases.size < maxMinor || olderMajors.size < maxMajor - 1;
    ++page
  ) {
    const request = await octokit.rest.repos.listReleases({
      // 100 per page disables cache as the result is >2MB
      per_page: 80,
      page: page,
      ...requestCache,
      ...repository,
    });
    if (request.status != 200 || request.data.length == 0) {
      break;
    }
    for (const data of request.data) {
      if (data.prerelease) {
        continue;
      }
      const release = mapRelease(data);
      const version = release.tag.replace(/^v/, "");
      const major = semver.major(version);
      const majorMinor = `${major}.${semver.minor(version)}`;
      if (!newestMajor) {
        newestMajor = major;
      }
      if (major === newestMajor) {
        if (!currentMajorReleases.has(majorMinor)) {
          currentMajorReleases.set(majorMinor, release);
        }
      } else {
        if (!olderMajors.has(major)) {
          olderMajors.set(major, release);
        }
      }
    }
  }

  return Array.from(currentMajorReleases.values())
    .slice(0, maxMinor)
    .concat(Array.from(olderMajors.values()).slice(0, maxMajor - 1));
}

export async function getWeeklyContributions(): Promise<
  RestEndpointMethodTypes["repos"]["getCommitActivityStats"]["response"]
> {
  return octokit.rest.repos.getCommitActivityStats(repository);
}
export async function fetchReport(): Promise<AVM2Report | undefined> {
  const releases = await getLatestNightlyReleases();
  const latest = releases.find(
    (release) => release.avm2_report_asset_id !== undefined,
  );
  if (!latest?.avm2_report_asset_id) {
    throwBuildError();
    return;
  }
  const asset = await octokit.rest.repos.getReleaseAsset({
    ...repository,
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
  const issues = await octokit.rest.issues.listForRepo({
    ...repository,
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
