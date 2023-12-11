import {
  Button,
  Code,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Octokit } from "octokit";
import { createTokenAuth } from "@octokit/auth-token";
import classes from "./downloads.module.css";
import React from "react";
import { ExtensionList } from "@/app/downloads/extensions";
import { NightlyList } from "@/app/downloads/nightlies";
import Link from "next/link";
import {
  desktopLinks,
  GithubRelease,
  ReleaseDownloads,
} from "@/app/downloads/config";

// Number of seconds to cache `fetch()` (ie octokit) responses.
// Doesn't really matter for static generation but... maybe one day we'll switch to SSR
export const revalidate = 1800;
const repository = { owner: "ruffle-rs", repo: "ruffle" };
const maxNightlies = 5;
const githubReleasesUrl = `https://github.com/${repository.owner}/${repository.repo}/releases`;

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

function WebDownload({ latest }: { latest: GithubRelease | null }) {
  return (
    <Stack>
      <Title>Website Package</Title>
      <Text>
        You can install Ruffle onto a website using one single line of code by
        using a CDN, no extra work required! It'll always stay up to date with
        the latest available version of Ruffle.
      </Text>
      <Code block className={classes.cdn}>
        {'<script src="https://unpkg.com/@ruffle-rs/ruffle"></script>'}
      </Code>
      <Text>
        If you'd like to host it yourself, you can grab{" "}
        <Link
          href={latest?.downloads?.web || githubReleasesUrl}
          target="_blank"
        >
          the latest self-hosted package
        </Link>{" "}
        and upload it to your server. Then, include it on your page like so:
      </Text>
      <Code block className={classes.cdn}>
        {'<script src="path/to/ruffle.js"></script>'}
      </Code>
      <Text>
        For advanced usage, consult{" "}
        <Link href="https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#javascript-api">
          our documentation
        </Link>{" "}
        for our JavaScript API and installation options.
      </Text>
    </Stack>
  );
}

function DesktopDownload({ latest }: { latest: GithubRelease | null }) {
  return (
    <Stack>
      <Title>Desktop Application</Title>
      <Text>
        If you want to run Flash content on your computer without a browser
        in-between, we have native applications that will take full advantage of
        your GPU and system resources to get those extra frames when playing
        intense games.
      </Text>
      <Group>
        {desktopLinks.map((link, index) => {
          const url = latest ? latest.downloads[link.key] : undefined;
          return (
            <Button
              key={index}
              radius="xl"
              size="md"
              component={Link}
              href={url || ""}
              disabled={!url}
              target={url && "_blank"}
              className={classes.download}
              title={url ? "" : "Unavailable"}
            >
              <link.icon />
              {link.name}
            </Button>
          );
        })}
      </Group>
    </Stack>
  );
}

export default async function Page() {
  const releases = await getLatestReleases();
  const latest = releases.length > 0 ? releases[0] : null;
  const nightlies = releases
    .filter((release) => release.prerelease)
    .slice(0, maxNightlies);
  return (
    <Container size="xl" className={classes.container}>
      <Stack gap="xl">
        <ExtensionList />
        <WebDownload latest={latest} />
        <DesktopDownload latest={latest} />

        <NightlyList nightlies={nightlies} />
      </Stack>
    </Container>
  );
}
