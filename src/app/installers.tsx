"use client";

import {
  IconBrandAndroid,
  IconBrandApple,
  IconBrandChrome,
  IconBrandEdge,
  IconBrandFirefox,
  IconBrandSafari,
  IconBrandWindows,
  IconBrowser,
  IconList,
  TablerIconsProps,
} from "@tabler/icons-react";
import React from "react";
import { useDeviceSelectors } from "react-device-detect";
import classes from "./index.module.css";
import { Button, Group } from "@mantine/core";
import Link from "next/link";

interface Installer {
  icon: (props: TablerIconsProps) => React.JSX.Element;
  name: string;
  url: string;
  className?: string;
}

export default function Installers() {
  const [selectors] = useDeviceSelectors(window.navigator.userAgent);
  const installers: Installer[] = [];

  if (selectors.isDesktop) {
    if (selectors.isFirefox) {
      installers.push({
        icon: IconBrandFirefox,
        name: "Firefox Extension",
        url: "https://addons.mozilla.org/en-US/firefox/addon/ruffle_rs/",
      });
    }
    if (selectors.isEdge) {
      installers.push({
        icon: IconBrandEdge,
        name: "Edge Extension",
        url: "https://microsoftedge.microsoft.com/addons/detail/ruffle/pipjjbgofgieknlpefmcckdmgaaegban",
      });
    }
    if (selectors.isChrome) {
      installers.push({
        icon: IconBrandChrome,
        name: "Chrome Extension",
        url: "https://chrome.google.com/webstore/detail/ruffle-flash-emulator/donbcfbmhbcapadipfkeojnmajbakjdc",
      });
    }
    if (selectors.isSafari) {
      installers.push({
        icon: IconBrandSafari,
        name: "Safari Extension",
        url: "/", // todo
      });
    }
  } else if (selectors.isAndroid) {
    if (selectors.isFirefox) {
      installers.push({
        icon: IconBrandFirefox,
        name: "Firefox Extension",
        url: "https://addons.mozilla.org/en-US/android/addon/ruffle_rs/",
      });
    }
  }

  if (selectors.isWindows) {
    installers.push({
      icon: IconBrandWindows,
      name: "Windows Executable",
      url: "/", // todo
    });
  }
  if (selectors.isMacOs) {
    installers.push({
      icon: IconBrandApple,
      name: "Mac Application",
      url: "/", // todo
    });
  }
  if (selectors.isAndroid) {
    installers.push({
      icon: IconBrandAndroid,
      name: "Android App",
      url: "/", // todo
    });
  }

  installers.push({ icon: IconBrowser, name: "Website Package", url: "/" }); // todo
  installers.push({
    icon: IconList,
    name: "Other Downloads",
    url: "/", // todo
    className: classes.otherDownloadsButton,
  });

  return (
    <Group mt={30} className={classes.buttons} grow preventGrowOverflow={false}>
      {installers.map((installer) => (
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
