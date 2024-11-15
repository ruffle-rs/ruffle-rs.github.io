"use client";

import { Burger, Container, Drawer, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSelector, useTranslation } from "@/app/translate";
import React from "react";

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

export function Header() {
  const { t } = useTranslation();
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

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
          <LanguageSelector />
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
        <LanguageSelector className={classes.hiddenOnDesktop} />
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
