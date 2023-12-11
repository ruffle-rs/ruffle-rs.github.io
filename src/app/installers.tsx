"use client";

import { IconList, TablerIconsProps } from "@tabler/icons-react";
import React from "react";
import { useDeviceSelectors } from "react-device-detect";
import classes from "./index.module.css";
import { Button, Group } from "@mantine/core";
import Link from "next/link";
import { allLinks, CurrentDevice, GithubRelease } from "@/app/downloads/config";

interface Installer {
  icon: (props: TablerIconsProps) => React.JSX.Element;
  name: string;
  url: string;
  className?: string;
}

export default function Installers({
  release,
}: {
  release: GithubRelease | null;
}) {
  const [selectors] = useDeviceSelectors(window.navigator.userAgent);
  const recommended: Installer[] = [];
  const currentDevice: CurrentDevice = {
    windows: selectors.isWindows,
    mac: selectors.isMacOs,
    android: selectors.isAndroid,
    linux: selectors.osName.toLowerCase() == "linux", // https://github.com/duskload/react-device-detect/issues/200
    ios: selectors.isIOS,
    firefox: selectors.isFirefox,
    chrome: selectors.isChrome,
    edge: selectors.isEdge,
    safari: selectors.isSafari,
    desktop: selectors.isDesktop,
    mobile: selectors.isMobile,
  };

  for (const link of allLinks) {
    if (link.isDeviceRelevant(currentDevice)) {
      const url = link.recommendedUrl || release?.downloads[link.key];
      if (url) {
        recommended.push({
          icon: link.icon,
          name: link.longName,
          url,
        });
      }
    }
  }

  recommended.push({
    icon: IconList,
    name: "Other Downloads",
    url: "/downloads",
    className: classes.otherDownloadsButton,
  });

  return (
    <Group mt={30} className={classes.buttons} grow preventGrowOverflow={false}>
      {recommended.map((installer) => (
        <Button
          radius="xl"
          size="md"
          className={installer.className ?? classes.installButton}
          key={installer.name}
          component={Link}
          href={installer.url}
          target="_blank"
        >
          <installer.icon />
          {installer.name}
        </Button>
      ))}
    </Group>
  );
}
