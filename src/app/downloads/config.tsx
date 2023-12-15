import {
  IconBrandApple,
  IconBrandChrome,
  IconBrandEdge,
  IconBrandFirefox,
  IconBrandJavascript,
  IconBrandSafari,
  IconBrandWindows,
  TablerIconsProps,
} from "@tabler/icons-react";
import React from "react";
import { IconBrandLinux } from "@/components/icons";

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
  chromium?: string;

  web?: string;
}

export type DownloadKey = keyof ReleaseDownloads;

export const FilenamePatterns: Record<DownloadKey, string> = {
  windows_64: "-windows-x86_64",
  windows_32: "-windows-x86_32",
  macos: "-macos",
  linux: "-linux",
  firefox: "-firefox-unsigned",
  chromium: "-extension.",
  web: "-selfhosted",
};

export interface CurrentDevice {
  windows: boolean;
  mac: boolean;
  linux: boolean;

  android: boolean;
  ios: boolean;

  firefox: boolean;
  chrome: boolean;
  edge: boolean;
  safari: boolean;

  desktop: boolean;
  mobile: boolean;
}

export interface DownloadLink {
  /**
   * Which download as part of a Release, belongs to this link
   */
  key: keyof ReleaseDownloads;

  /**
   * A short name for this link - for use in the Nightly table
   */
  shortName: string;

  /**
   * A long name for this link - for use in the homepage
   */
  longName: string;

  /**
   * Icon to represent this link
   */
  icon: (props: TablerIconsProps) => React.JSX.Element;

  /**
   * Whether or not to recommend this link to the given device
   * @param device Device as detected by browser useragent
   */
  isDeviceRelevant: (device: CurrentDevice) => boolean;

  /**
   * Whether to recommend this as a normal download.
   * If false, it'll only be shown in the nightly list.
   */
  isRecommended: boolean;

  /**
   * If recommending this link to the user, what's the official link we should send them to instead of a manual download?
   */
  recommendedUrl?: string;
}

export const desktopLinks: DownloadLink[] = [
  {
    key: "windows_64",
    shortName: "Windows (64-bit)",
    longName: "Windows Executable",
    icon: IconBrandWindows,
    isRecommended: true,
    isDeviceRelevant: (device) => device.desktop && device.windows,
  },
  {
    key: "windows_32",
    shortName: "Windows (32-bit)",
    longName: "Windows Executable",
    icon: IconBrandWindows,
    isRecommended: false,
    isDeviceRelevant: () => false,
  },
  {
    key: "macos",
    shortName: "macOS",
    longName: "Mac Application",
    icon: IconBrandApple,
    isRecommended: true,
    isDeviceRelevant: (device) => device.desktop && device.mac,
  },
  {
    key: "linux",
    shortName: "Linux",
    longName: "Linux Executable",
    icon: IconBrandLinux,
    isRecommended: true,
    isDeviceRelevant: (device) => device.desktop && device.linux,
  },
];

export const extensionLinks: DownloadLink[] = [
  {
    key: "chromium",
    shortName: "Chrome",
    longName: "Chrome Extension",
    icon: IconBrandChrome,
    isDeviceRelevant: (device) => device.desktop && device.chrome,
    isRecommended: true,
    recommendedUrl:
      "https://chromewebstore.google.com/detail/ruffle-flash-emulator/donbcfbmhbcapadipfkeojnmajbakjdc",
  },
  {
    key: "chromium",
    shortName: "Edge",
    longName: "Edge Extension",
    icon: IconBrandEdge,
    isDeviceRelevant: (device) => device.desktop && device.edge,
    isRecommended: true,
    recommendedUrl:
      "https://microsoftedge.microsoft.com/addons/detail/ruffle/pipjjbgofgieknlpefmcckdmgaaegban",
  },
  {
    key: "firefox",
    shortName: "Firefox",
    longName: "Firefox Extension",
    icon: IconBrandFirefox,
    isDeviceRelevant: (device) =>
      (device.desktop || device.android) && device.firefox,
    isRecommended: true,
    recommendedUrl: "https://addons.mozilla.org/en-US/firefox/addon/ruffle_rs/",
  },
  {
    key: "macos",
    shortName: "Safari",
    longName: "Safari Extension",
    icon: IconBrandSafari,
    isRecommended: true,
    isDeviceRelevant: () => false,
  },
];

export const webLinks: DownloadLink[] = [
  {
    key: "web",
    shortName: "Self Hosted",
    longName: "Website Package",
    icon: IconBrandJavascript,
    isRecommended: true,
    isDeviceRelevant: () => true,
  },
];

export const allLinks: DownloadLink[] = [
  extensionLinks,
  desktopLinks,
  webLinks,
].flat();
