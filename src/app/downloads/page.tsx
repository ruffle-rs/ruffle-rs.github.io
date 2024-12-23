"use client";

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
import { useTranslation, Trans } from "@/app/translate";

function WebDownload({ latest }: { latest: GithubRelease | null }) {
  const { t } = useTranslation();
  return (
    <Stack>
      <Title id="website-package">{t("installers.selfhosted-long-name")}</Title>
      <Text>{t("downloads.web-package-description")}</Text>
      <Code block className={classes.cdn}>
        {'<script src="https://unpkg.com/@ruffle-rs/ruffle"></script>'}
      </Code>
      <Text>
        <Trans
          i18nKey="downloads.self-host-description"
          components={[
            <Link
              key="link"
              href={latest?.downloads?.web || githubReleasesUrl}
              target="_blank"
            >
              {t("downloads.self-host-description-link")}
            </Link>,
          ]}
        />
      </Text>
      <Code block className={classes.cdn}>
        {'<script src="path/to/ruffle.js"></script>'}
      </Code>
      <Text>
        <Trans
          i18nKey="downloads.advanced-usage-description"
          components={[
            <Link
              key="link"
              href="https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#javascript-api"
            >
              {t("downloads.advanced-usage-description-link")}
            </Link>,
          ]}
        />
      </Text>
    </Stack>
  );
}

function DesktopDownload({ latest }: { latest: GithubRelease | null }) {
  const { t } = useTranslation();
  return (
    <Stack>
      <Title id="desktop-app">{t("downloads.desktop-app")}</Title>
      <Text>{t("downloads.desktop-app-description")}</Text>
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
                {t(link.shortName)}
              </Button>
            );
          })}
      </Group>
    </Stack>
  );
}

export default function Page() {
  const [latest, setLatest] = React.useState<GithubRelease | null>(null);
  const [nightlies, setNightlies] = React.useState<GithubRelease[] | null>(
    null,
  );
  React.useEffect(() => {
    const fetchReleases = async () => {
      try {
        const releases = await getLatestReleases();
        const nightlies = releases
          .filter((release) => release.prerelease)
          .slice(0, maxNightlies);
        setNightlies(nightlies);
        setLatest(releases.length > 0 ? releases[0] : null);
      } catch (err) {
        console.warn("Failed to fetch releases", err);
      }
    };
    fetchReleases();
  }, []);
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
