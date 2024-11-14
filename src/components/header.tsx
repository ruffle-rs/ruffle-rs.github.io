"use client";

import { Burger, Container, Drawer, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "next-export-i18n";
import React, { useState, useEffect } from "react";

const links = [
  { link: "/", labelKey: "header.about" },
  { link: "/downloads", labelKey: "header.downloads" },
  { link: "/compatibility", labelKey: "header.compatibility" },
  { link: "/contribute", labelKey: "header.contribute" },
  { link: "/blog", labelKey: "header.blog" },
  { link: "/demo", labelKey: "header.demo", target: "_blank" },
  {
    link: "https://discord.gg/ruffle",
    labelKey: "header.discord",
    target: "_blank",
  },
  {
    link: "https://github.com/ruffle-rs/ruffle/",
    labelKey: "header.github",
    target: "_blank",
  },
];
const languages: Record<string, string> = {
  en: "English",
  es: "Español",
};

export function Header() {
  const [selectedLang, setSelectedLang] = useState("en");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const browserLang =
        window.navigator.language || window.navigator.languages
          ? (window.navigator.language || window.navigator.languages[0])
              .split("-")[0]
              .toLowerCase()
          : "en";
      setSelectedLang(browserLang);
      const selectedLang = window.localStorage
        ? window.localStorage.getItem("next-export-i18n-lang")
        : null;
      if (selectedLang) {
        setSelectedLang(selectedLang);
      }
    }
  }, []);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newLang = event.target.value;
    setSelectedLang(newLang);
    window.localStorage.setItem("next-export-i18n-lang", newLang);
    const langChangeEvent = new Event("localStorageLangChange");
    document.dispatchEvent(langChangeEvent);
  };

  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  const items = links.map((link) => (
    <Link
      key={link.labelKey}
      href={link.link}
      target={link.target}
      className={classes.link}
      data-active={pathname === link.link || undefined}
      onClick={() => {
        close();
      }}
      suppressHydrationWarning
    >
      {t(link.labelKey)}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="lg" className={classes.inner}>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Ruffle Logo"
            height={30}
            width={91}
            priority
          />
        </Link>
        <Group gap={5} visibleFrom="md">
          {items}
          <select value={selectedLang} onChange={handleLanguageChange}>
            {Object.entries(languages).map(([langCode, langName]) => (
              <option key={langCode} value={langCode}>
                {langName}
              </option>
            ))}
          </select>
        </Group>{" "}
        <Drawer
          opened={opened}
          onClose={close}
          position="top"
          classNames={{
            inner: classes.drawer,
            overlay: classes.overlay,
            content: classes.content,
          }}
          withCloseButton={false}
        >
          {items}
        </Drawer>
        <select
          className={classes.hiddenOnDesktop}
          value={selectedLang}
          onChange={handleLanguageChange}
        >
          {Object.entries(languages).map(([langCode, langName]) => (
            <option key={langCode} value={langCode}>
              {langName}
            </option>
          ))}
        </select>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="md"
          size="sm"
          className={classes.burger}
        />
      </Container>
    </header>
  );
}
