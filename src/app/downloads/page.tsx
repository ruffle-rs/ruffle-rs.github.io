import {
  Button,
  Code,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import classes from "./downloads.module.css";
import React from "react";
import { ExtensionList } from "@/app/downloads/extensions";
import { NightlyList } from "@/app/downloads/nightlies";
import Link from "next/link";
import {
  desktopLinks,
  GithubRelease,
  githubReleasesUrl,
  maxNightlies,
} from "@/app/downloads/config";
import { getLatestReleases } from "@/app/downloads/github";

function WebDownload({ latest }: { latest: GithubRelease | null }) {
  return (
    <Stack>
      <Title id="website-package">Website Package</Title>
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
      <Title id="desktop-app">Desktop Application</Title>
      <Text>
        If you want to run Flash content on your computer without a browser
        in-between, we have native applications that will take full advantage of
        your GPU and system resources to get those extra frames when playing
        intense games.
      </Text>
      <Group>
        {desktopLinks
          .filter((link) => link.isRecommended)
          .map((link, index) => {
            const url = link.recommendedUrl || latest?.downloads[link.key];
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
                {link.shortName}
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
