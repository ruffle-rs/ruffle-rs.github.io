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
  desktopLinks,
  type DownloadLink,
  extensionLinks,
  type GithubRelease,
  githubReleasesUrl,
  webLinks,
} from "@/app/downloads/config";
import { useTranslation, Trans } from "@/app/translate";

function DownloadLink({
  link,
  release,
}: {
  link: DownloadLink;
  release: GithubRelease;
}) {
  const { t } = useTranslation();
  const url = release.downloads[link.key];
  if (!url) {
    return <></>;
  }

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
      {t(link.shortName)}
    </Button>
  );
}

function NightlyRow(release: GithubRelease) {
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

function NightlyCompactBox(release: GithubRelease) {
  const { t } = useTranslation();
  return (
    <>
      <Link href={release.url} className={classes.nameAsHeader} target="_blank">
        {release.name}
      </Link>
      <Title order={5}>{t("downloads.desktop-app")}</Title>
      <Group>
        {desktopLinks.map((link, index) => (
          <DownloadLink key={index} link={link} release={release} />
        ))}
      </Group>
      <Title order={5}>{t("downloads.browser-extension")}</Title>
      <Group>
        {extensionLinks.map((link, index) => (
          <DownloadLink key={index} link={link} release={release} />
        ))}
      </Group>
      <Title order={5}>{t("downloads.web-package")}</Title>
      <Group>
        {webLinks.map((link, index) => (
          <DownloadLink key={index} link={link} release={release} />
        ))}
      </Group>
    </>
  );
}

export function NightlyList({
  nightlies,
}: {
  nightlies: GithubRelease[] | null;
}) {
  const { t } = useTranslation();
  return (
    <Stack>
      <Title id="nightly-releases">{t("downloads.nightly-releases")}</Title>
      <Text>
        <Trans
          i18nKey="downloads.nightly-releases-description"
          components={[
            <Link
              key="link"
              href={githubReleasesUrl}
              className={classes.moreNightlies}
              target="_blank"
            >
              {t("footer.github")}
            </Link>,
          ]}
        />
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
            <TableTh>{t("downloads.version")}</TableTh>
            <TableTh>{t("downloads.desktop-app")}</TableTh>
            <TableTh>{t("downloads.browser-extension")}</TableTh>
            <TableTh>{t("downloads.web-package")}</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody className={classes.body}>
          {nightlies?.map((nightly) => (
            <NightlyRow key={nightly.id} {...nightly} />
          ))}
        </TableTbody>
      </Table>

      <Stack hiddenFrom="sm">
        {/*Compact mobile view, because a table is far too wide*/}
        {nightlies?.map((nightly) => (
          <NightlyCompactBox key={nightly.id} {...nightly} />
        ))}
      </Stack>
    </Stack>
  );
}
