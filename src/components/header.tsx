"use client";

import { useState } from "react";
import { Container, Group, Burger, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./header.module.css";
import Image from "next/image";

const links = [
  { link: "/", label: "What is Ruffle" },
  { link: "/test", label: "Usage" },
  { link: "/test", label: "Downloads" },
  { link: "/test", label: "Compatibility" },
  { link: "/test", label: "Get Involved" },
  { link: "/test", label: "Demo" },
  { link: "/test", label: "Join Discord" },
  { link: "/test", label: "Blog" },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        close();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Image
          src="/logo.svg"
          alt="Ruffle Logo"
          height={30}
          width={91}
          priority
        />
        <Group gap={5} visibleFrom="md">
          {items}
        </Group>{" "}
        <Drawer
          opened={opened}
          onClose={close}
          position="top"
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
