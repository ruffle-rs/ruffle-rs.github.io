"use client";

import {
  Container,
  Group,
  List,
  ListItem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import classes from "./contribute.module.css";
import React from "react";
import Image from "next/image";
import { IconBrandRust, IconBrandTypescript } from "@tabler/icons-react";
import Link from "next/link";
import { SponsorList } from "@/app/contribute/sponsors";
import { useTranslation, Trans } from "@/app/translate";

function ContributeCode() {
  const { t } = useTranslation();
  return (
    <Stack className={classes.contributeSection}>
      <Title className={classes.title}>🖥️ {t("contribute.code")}</Title>
      <Text>{t("contribute.code-description")}</Text>
      <List>
        <ListItem icon={<IconBrandRust />}>
          <Trans
            i18nKey="contribute.rust"
            components={[
              <Link
                key="emulator"
                target="_blank"
                href="https://github.com/ruffle-rs/ruffle/"
              >
                {t("contribute.emulator")}
              </Link>,
              <Link
                key="desktop-player"
                target="_blank"
                href="https://github.com/ruffle-rs/ruffle/tree/master/desktop"
              >
                {t("contribute.desktop-player")}
              </Link>,
            ]}
          />
        </ListItem>
        <ListItem icon={<IconBrandTypescript />}>
          <Trans
            i18nKey="contribute.typescript"
            components={[
              <Link
                key="web-player"
                target="_blank"
                href="https://github.com/ruffle-rs/ruffle/tree/master/web"
              >
                {t("contribute.web-player")}
              </Link>,
              <Link
                key="extension"
                target="_blank"
                href="https://github.com/ruffle-rs/ruffle/tree/master/web/packages/extension"
              >
                {t("contribute.extension")}
              </Link>,
              <Link
                key="website"
                target="_blank"
                href="https://github.com/ruffle-rs/ruffle-rs.github.io"
              >
                {t("contribute.website")}
              </Link>,
            ]}
          />
        </ListItem>
      </List>
      <Text>
        <Trans
          i18nKey="contribute.getting-started"
          components={[
            <Link
              key="guidelines"
              target="_blank"
              href="https://github.com/ruffle-rs/ruffle/blob/master/CONTRIBUTING.md"
            >
              {t("contribute.guidelines")}
            </Link>,
            <Link
              key="discord"
              target="_blank"
              href="https://discord.gg/ruffle"
            >
              {t("footer.discord")}
            </Link>,
          ]}
        />
      </Text>
    </Stack>
  );
}

function TestContent() {
  const { t } = useTranslation();
  return (
    <Stack className={classes.contributeSection}>
      <Title className={classes.title}>🕹️ {t("contribute.test")}</Title>
      <Text>{t("contribute.test-description")}</Text>
      <Text>
        <Trans
          i18nKey="contribute.report-bugs"
          components={[
            <Link
              key="bug-tracker"
              target="_blank"
              href="https://github.com/ruffle-rs/ruffle/issues"
            >
              {t("contribute.bug-tracker")}
            </Link>,
          ]}
        />
      </Text>
      <Text>
        <Trans
          i18nKey="contribute.working"
          components={[
            <Link
              key="our-discord"
              target="_blank"
              href="https://discord.gg/ruffle"
            >
              {t("contribute.our-discord")}
            </Link>,
          ]}
        />
      </Text>
    </Stack>
  );
}

function Sponsorship() {
  const { t } = useTranslation();
  return (
    <Stack className={classes.contributeSection}>
      <Title className={classes.title}>💲 {t("contribute.sponsor")}</Title>
      <Text>{t("contribute.sponsor-description")}</Text>
      <Text>
        <Trans
          i18nKey="contribute.sponsor-info"
          components={[
            <Link
              key="opencollective"
              target="_blank"
              href="https://opencollective.com/ruffle"
            >
              {t("contribute.opencollective")}
            </Link>,
          ]}
        />
      </Text>
    </Stack>
  );
}

function SpreadTheWord() {
  const { t } = useTranslation();
  return (
    <Stack className={classes.contributeSection}>
      <Title className={classes.title}>
        💬 {t("contribute.spread-the-word")}
      </Title>
      <Text>{t("contribute.spread-the-word-description")}</Text>
    </Stack>
  );
}

export default function Page() {
  const { t } = useTranslation();
  return (
    <Container size="xl" className={classes.container}>
      <Group align="top" wrap="nowrap">
        <Image
          src="/undraw/undraw_super_thank_you_re_f8bo.svg"
          alt="Person thanking you"
          width={185}
          height={200}
          priority
          className={classes.image}
        />
        <Stack className={classes.actionscriptInfo}>
          <Title className={classes.title}>{t("contribute.involved")}</Title>
          <Text>{t("contribute.involved-description")}</Text>
        </Stack>
      </Group>

      <Group align="baseline" justify="space-between">
        <ContributeCode />
        <TestContent />
        <Sponsorship />
        <SpreadTheWord />
      </Group>

      <SponsorList />
    </Container>
  );
}
