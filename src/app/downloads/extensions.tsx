"use client";

import { Group, Stack, Text, Title } from "@mantine/core";
import classes from "./extensions.module.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/app/translate";

interface Extension {
  image: string;
  url: string;
  alt: string;
}

const extensions: Extension[] = [
  {
    image: "/extension_badges/chrome.svg",
    url: "https://chromewebstore.google.com/detail/ruffle-flash-emulator/donbcfbmhbcapadipfkeojnmajbakjdc",
    alt: "downloads.chrome-extension-alt",
  },
  {
    image: "/extension_badges/firefox.svg",
    url: "https://addons.mozilla.org/firefox/addon/ruffle_rs",
    alt: "downloads.firefox-extension-alt",
  },
  {
    image: "/extension_badges/edge.svg",
    url: "https://microsoftedge.microsoft.com/addons/detail/ruffle/pipjjbgofgieknlpefmcckdmgaaegban",
    alt: "downloads.edge-extension-alt",
  },
];

function ExtensionBadge(info: Extension) {
  const { t } = useTranslation();
  return (
    <Link href={info.url} target="_blank">
      <Image
        src={info.image}
        alt={t(info.alt)}
        width={0} // set by css to 100% width
        height={66}
        priority
        className={classes.badge}
      />
    </Link>
  );
}

export function ExtensionList() {
  const { t } = useTranslation();
  return (
    <Stack>
      <Title id="extension" className={classes.title}>
        {t("downloads.browser-extension")}
      </Title>
      <Text>{t("downloads.browser-extension-description")}</Text>
      <Group>
        {extensions.map((extension, i) => (
          <ExtensionBadge key={i} {...extension} />
        ))}
      </Group>
    </Stack>
  );
}
