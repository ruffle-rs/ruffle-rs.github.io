"use client";

import { Icon, IconBrandJavascript, IconList } from "@tabler/icons-react";
import React from "react";
import { useDeviceSelectors } from "react-device-detect";
import classes from "./index.module.css";
import { Button, Group } from "@mantine/core";
import Link from "next/link";
import { allLinks, CurrentDevice, GithubRelease } from "@/app/downloads/config";

interface RecommendedDownload {
  icon: React.ExoticComponent<React.RefAttributes<Icon>>;
  name: string;
  url: string;
  className?: string;
  target?: string;
}

export default function Installers({
  release,
}: {
  release: GithubRelease | null;
}) {
  const [selectors] = useDeviceSelectors(window.navigator.userAgent);
  const recommended: RecommendedDownload[] = [];
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
          target: "_blank",
          url,
        });
      }
    }
  }

  recommended.push({
    name: "Website Package",
    icon: IconBrandJavascript,
    url: "/downloads#website-package",
  });

  recommended.push({
    icon: IconList,
    name: "Other Downloads",
    url: "/downloads",
    className: classes.otherDownloadsButton,
  });

  return (
    <Group mt={30} className={classes.buttons} grow preventGrowOverflow={false}>
      {recommended.map((download) => (
        <Button
          radius="xl"
          size="md"
          className={download.className ?? classes.installButton}
          key={download.name}
          component={Link}
          href={download.url}
          target={download.target}
        >
          <download.icon />
          {download.name}
        </Button>
      ))}
    </Group>
  );
}
