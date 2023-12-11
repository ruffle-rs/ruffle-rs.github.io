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
import React from "react";

export const repository = { owner: "ruffle-rs", repo: "ruffle" };

export const maxNightlies = 5;

export const githubReleasesUrl = `https://github.com/${repository.owner}/${repository.repo}/releases`;

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

export interface DownloadLink {
  key: keyof ReleaseDownloads;
  name: string;
  icon: (props: TablerIconsProps) => React.JSX.Element;
}

export const desktopLinks: DownloadLink[] = [
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

export const extensionLinks: DownloadLink[] = [
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

export const webLinks: DownloadLink[] = [
  {
    key: "web",
    name: "Self Hosted",
    icon: IconBrandJavascript,
  },
];
