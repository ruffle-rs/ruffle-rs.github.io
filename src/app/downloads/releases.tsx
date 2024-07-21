"use client"; // tables in mantine don't seem to work on server...

import {
  Button,
  Group,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import Link from "next/link";
import classes from "./releases.module.css";
import {
  desktopLinks,
  type DownloadLink,
  extensionLinks,
  type GithubRelease,
  githubReleasesUrl,
  webLinks,
} from "@/app/downloads/config";

function DownloadLink({
  link,
  release,
}: {
  link: DownloadLink;
  release: GithubRelease;
}) {
  const url = release.downloads[link.key];

  return (
    <Button
      radius="xl"
      size="compact-sm"
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
}

function ReleaseRow(release: GithubRelease) {
  // The nightly prefix is a bit superfluous here
  const name = release.name.replace(/^Nightly /, "");
  return (
    <TableTr>
      <TableTd>
        <Link href={release.url} className={classes.name} target="_blank">
          {name}
        </Link>
      </TableTd>
      <TableTd>
        <Group>
          {desktopLinks.map((link, index) => (
            <DownloadLink key={index} link={link} release={release} />
          ))}
        </Group>
      </TableTd>
      <TableTd>
        <Group>
          {extensionLinks.map((link, index) => (
            <DownloadLink key={index} link={link} release={release} />
          ))}
        </Group>
      </TableTd>
      <TableTd>
        <Group>
          {webLinks.map((link, index) => (
            <DownloadLink key={index} link={link} release={release} />
          ))}
        </Group>
      </TableTd>
    </TableTr>
  );
}

function ReleaseCompactBox(release: GithubRelease) {
  return (
    <>
      <Link href={release.url} className={classes.nameAsHeader} target="_blank">
        {release.name}
      </Link>
      <Title order={5}>Desktop Application</Title>
      <Group>
        {desktopLinks.map((link, index) => (
          <DownloadLink key={index} link={link} release={release} />
        ))}
      </Group>
      <Title order={5}>Browser Extension</Title>
      <Group>
        {extensionLinks.map((link, index) => (
          <DownloadLink key={index} link={link} release={release} />
        ))}
      </Group>
      <Title order={5}>Web Package</Title>
      <Group>
        {webLinks.map((link, index) => (
          <DownloadLink key={index} link={link} release={release} />
        ))}
      </Group>
    </>
  );
}

export function ReleaseList({ releases }: { releases: GithubRelease[] }) {
  return (
    <Stack>
      <Title id="nightly-releases">Nightly Releases</Title>
      <Text>
        If none of the above are suitable for you, you can manually download the
        latest Nightly release. These are automatically built every day
        (approximately midnight UTC), unless there are no changes on that day.{" "}
        Older nightly releases are available on{" "}
        <Link href={githubReleasesUrl} target="_blank">
          GitHub
        </Link>
        .
      </Text>
      <Table
        horizontalSpacing="md"
        verticalSpacing="md"
        borderColor="var(--ruffle-blue-7)"
        visibleFrom="sm"
        withColumnBorders
      >
        <TableThead className={classes.header}>
          <TableTr>
            <TableTh>Version</TableTh>
            <TableTh>Desktop Application</TableTh>
            <TableTh>Browser Extension</TableTh>
            <TableTh>Web Package</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody className={classes.body}>
          {releases.map((release) => (
            <ReleaseRow key={release.id} {...release} />
          ))}
        </TableTbody>
      </Table>

      <Stack hiddenFrom="sm">
        {/*Compact mobile view, because a table is far too wide*/}
        {releases.map((release) => (
          <ReleaseCompactBox key={release.id} {...release} />
        ))}
      </Stack>
    </Stack>
  );
}
