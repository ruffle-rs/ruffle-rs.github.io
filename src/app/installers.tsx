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
import { BrowserTypes, OsTypes, useDeviceSelectors } from "react-device-detect";
import classes from "./index.module.css";
import { Button, Group } from "@mantine/core";

interface Installer {
  icon: (props: TablerIconsProps) => React.JSX.Element;
  name: string;
  url: string;
  className?: string;
}

export default function Installers() {
  const [selectors, data] = useDeviceSelectors(window.navigator.userAgent);
  const installers: Installer[] = [];

  if (selectors.isDesktop) {
    if (selectors.isFirefox) {
      installers.push({
        icon: IconBrandFirefox,
        name: "Firefox Extension",
        url: "/",
      });
    }
    if (selectors.isEdge) {
      installers.push({
        icon: IconBrandEdge,
        name: "Edge Extension",
        url: "/",
      });
    }
    if (selectors.isChrome) {
      installers.push({
        icon: IconBrandChrome,
        name: "Chrome Extension",
        url: "/",
      });
    }
    if (selectors.isSafari) {
      installers.push({
        icon: IconBrandSafari,
        name: "Safari Extension",
        url: "/",
      });
    }
  }

  if (selectors.isWindows) {
    installers.push({
      icon: IconBrandWindows,
      name: "Windows Executable",
      url: "/",
    });
  }
  if (selectors.isMacOs) {
    installers.push({
      icon: IconBrandApple,
      name: "Mac Application",
      url: "/",
    });
  }
  if (selectors.isAndroid) {
    installers.push({
      icon: IconBrandAndroid,
      name: "Android App",
      url: "/",
    });
  }

  installers.push({ icon: IconBrowser, name: "Website Package", url: "/" });
  installers.push({
    icon: IconList,
    name: "Other Downloads",
    url: "/",
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
        >
          <installer.icon />
          {installer.name}
        </Button>
      ))}
    </Group>
  );
}
