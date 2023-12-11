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
import classes from "./nightlies.module.css";
import {
  IconBrandApple,
  IconBrandChrome,
  IconBrandDebian,
  IconBrandFirefox,
  IconBrandJavascript,
  IconBrandSafari,
  IconBrandWindows,
  TablerIconsProps,
} from "@tabler/icons-react";

export interface GithubRelease {
  id: number;
  name: string;
  prerelease: boolean;
  downloads: ReleaseDownloads;
  url: string;
}

export interface ReleaseDownloads {
  windows_64?: string;
  windows_32?: string;
  macos?: string;
  linux?: string;

  firefox?: string;
  chrome?: string;
  safari?: string;

  web?: string;
}

interface DownloadLink {
  key: keyof ReleaseDownloads;
  name: string;
  icon: (props: TablerIconsProps) => React.JSX.Element;
}

const desktopLinks: DownloadLink[] = [
  {
    key: "windows_64",
    name: "Windows (64-bit)",
    icon: IconBrandWindows,
  },
  {
    key: "windows_32",
    name: "Windows (32-bit)",
    icon: IconBrandWindows,
  },
  {
    key: "macos",
    name: "macOS",
    icon: IconBrandApple,
  },
  {
    key: "linux",
    name: "Linux",
    icon: IconBrandDebian,
  },
];

const extensionLinks: DownloadLink[] = [
  {
    key: "chrome",
    name: "Chrome / Edge",
    icon: IconBrandChrome,
  },
  {
    key: "firefox",
    name: "Firefox",
    icon: IconBrandFirefox,
  },
  {
    key: "safari",
    name: "Safari",
    icon: IconBrandSafari,
  },
];

const webLinks: DownloadLink[] = [
  {
    key: "web",
    name: "Self Hosted",
    icon: IconBrandJavascript,
  },
];

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
      {link.name}
    </Button>
  );
}

function NightlyRow(release: GithubRelease) {
  return (
    <TableTr>
      <TableTd>
        <Link href={release.url} className={classes.name} target="_blank">
          {release.name}
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

function NightlyCompactBox(release: GithubRelease) {
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

export function NightlyList({ nightlies }: { nightlies: GithubRelease[] }) {
  return (
    <>
      <Title>Latest Nightly Releases</Title>
      <Text>
        If none of the above are suitable for you, you can manually download the
        latest Nightly release. These are automatically built every day
        (approximately midnight UTC), unless there are no changes on that day.
      </Text>
      <Table
        horizontalSpacing="md"
        verticalSpacing="md"
        borderColor="var(--ruffle-blue-7)"
        visibleFrom="sm"
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
          {nightlies.map((nightly) => (
            <NightlyRow key={nightly.id} {...nightly} />
          ))}
        </TableTbody>
      </Table>

      <Stack hiddenFrom="sm">
        {/*Compact mobile view, because a table is far too wide*/}
        {nightlies.map((nightly) => (
          <NightlyCompactBox key={nightly.id} {...nightly} />
        ))}
      </Stack>
    </>
  );
}
