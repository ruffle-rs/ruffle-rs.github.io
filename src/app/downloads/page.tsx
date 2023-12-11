import { Container, Stack } from "@mantine/core";
import { Octokit } from "octokit";
import { createTokenAuth } from "@octokit/auth-token";
import classes from "./downloads.module.css";
import React from "react";
import { ExtensionList } from "@/app/downloads/extensions";
import {
  GithubRelease,
  NightlyList,
  ReleaseDownloads,
} from "@/app/downloads/nightlies";

// Number of seconds to cache `fetch()` (ie octokit) responses.
// Doesn't really matter for static generation but... maybe one day we'll switch to SSR
export const revalidate = 1800;
const repository = { owner: "ruffle-rs", repo: "ruffle" };
const maxNightlies = 5;

function createGithubAuth() {
  if (process.env.GITHUB_TOKEN) {
    return createTokenAuth(process.env.GITHUB_TOKEN);
  } else {
    return null;
  }
}

async function getLatestReleases(): Promise<GithubRelease[]> {
  const octokit = new Octokit({ authStrategy: createGithubAuth });
  try {
    const releases = await octokit.rest.repos.listReleases({
      per_page: maxNightlies + 2, // more than we need to account for a possible draft release + possible full release
      ...repository,
    });
    const result = [];
    for (const release of releases.data) {
      const downloads: ReleaseDownloads = {};

      for (const asset of release.assets) {
        if (asset.name.indexOf("-windows-x86_64") > -1) {
          downloads.windows_64 = asset.browser_download_url;
        } else if (asset.name.indexOf("-windows-x86_32") > -1) {
          downloads.windows_32 = asset.browser_download_url;
        } else if (asset.name.indexOf("-macos") > -1) {
          downloads.macos = asset.browser_download_url;
        } else if (asset.name.indexOf("-linux") > -1) {
          downloads.linux = asset.browser_download_url;
        } else if (asset.name.indexOf("-firefox-unsigned") > -1) {
          downloads.firefox = asset.browser_download_url;
        } else if (asset.name.indexOf("-extension.") > -1) {
          downloads.chrome = asset.browser_download_url;
        } else if (asset.name.indexOf("-selfhosted") > -1) {
          downloads.web = asset.browser_download_url;
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
    console.warn("Couldn't get github releases", error);
    return [];
  }
}

export default async function Page() {
  const releases = await getLatestReleases();
  const nightlies = releases
    .filter((release) => release.prerelease)
    .slice(0, maxNightlies);
  return (
    <Container size="xl" className={classes.container}>
      <Stack>
        <ExtensionList />
        <NightlyList nightlies={nightlies} />
      </Stack>
    </Container>
  );
}
