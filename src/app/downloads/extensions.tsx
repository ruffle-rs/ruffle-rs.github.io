import { Group, Stack, Text, Title } from "@mantine/core";
import classes from "./extensions.module.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Extension {
  image: string;
  url: string;
  alt: string;
}

const extensions: Extension[] = [
  {
    image: "/extension_badges/chrome.svg",
    url: "https://chromewebstore.google.com/detail/ruffle-flash-emulator/donbcfbmhbcapadipfkeojnmajbakjdc",
    alt: "Available in the Chrome Web Store",
  },
  {
    image: "/extension_badges/firefox.svg",
    url: "https://addons.mozilla.org/firefox/addon/ruffle_rs",
    alt: "Get the Add-On for Firefox",
  },
  {
    image: "/extension_badges/edge.svg",
    url: "https://microsoftedge.microsoft.com/addons/detail/ruffle/pipjjbgofgieknlpefmcckdmgaaegban",
    alt: "Get it from Microsoft for Edge",
  },
];

function ExtensionBadge(info: Extension) {
  return (
    <Link href={info.url} target="_blank">
      <Image
        src={info.image}
        alt={info.alt}
        width={0} // set by css to 100% width
        height={66}
        priority
        className={classes.badge}
      />
    </Link>
  );
}

export function ExtensionList() {
  return (
    <Stack>
      <Title id="extension" className={classes.title}>
        Browser Extension
      </Title>
      <Text>
        If you visit websites that have Flash content but aren't using Ruffle,
        or you want to ensure you're using the latest and greatest version of
        Ruffle on every website, then our browser extension is the perfect thing
        for you!
      </Text>
      <Group>
        {extensions.map((extension, i) => (
          <ExtensionBadge key={i} {...extension} />
        ))}
      </Group>
    </Stack>
  );
}
