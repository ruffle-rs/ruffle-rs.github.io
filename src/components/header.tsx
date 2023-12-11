"use client";

import { Burger, Container, Drawer, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { link: "/", label: "What is Ruffle" },
  { link: "/downloads", label: "Downloads" },
  { link: "/compatibility", label: "Compatibility" },
  { link: "/test", label: "Get Involved" },
  { link: "/demo", label: "Demo" },
  { link: "/blog", label: "Blog" },
  { link: "https://discord.gg/ruffle", label: "Discord", target: "_blank" },
  {
    link: "https://github.com/ruffle-rs/ruffle/",
    label: "Github",
    target: "_blank",
  },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      target={link.target}
      className={classes.link}
      data-active={pathname === link.link || undefined}
      onClick={() => {
        close();
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
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
        </Group>{" "}
        <Drawer
          opened={opened}
          onClose={close}
          position="top"
          classNames={{ inner: classes.drawer, overlay: classes.overlay }}
          withCloseButton={false}
        >
          {items}
        </Drawer>
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
