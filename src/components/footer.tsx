import { Container, Group, ActionIcon, rem, Text } from "@mantine/core";
import Link from "next/link";

import {
  IconBrandX,
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandTiktok,
  IconBrandDiscord,
  IconBrandMastodon,
} from "@tabler/icons-react";
import classes from "./footer.module.css";
import Image from "next/image";

const allSocials = [
  {
    type: IconBrandGithub,
    url: "https://github.com/ruffle-rs",
    title: "GitHub",
  },
  {
    type: IconBrandX,
    url: "https://twitter.com/ruffle_rs",
    title: "X",
  },
  {
    type: IconBrandTiktok,
    url: "https://www.tiktok.com/@ruffle.rs",
    title: "Tiktok",
  },
  {
    type: IconBrandInstagram,
    url: "https://www.instagram.com/ruffle.rs/",
    title: "Instagram",
  },
  {
    type: IconBrandMastodon,
    url: "https://mastodon.gamedev.place/@ruffle",
    title: "Mastodon",
  },
  {
    type: IconBrandDiscord,
    url: "https://discord.gg/ruffle",
    title: "Discord",
  },
];

export function FooterSocial() {
  const socials = allSocials.map((social, i) => (
    <ActionIcon
      key={i}
      size="lg"
      color="gray"
      variant="subtle"
      component={Link}
      href={social.url}
      target="_blank"
      title={social.title}
    >
      <social.type style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Container className={classes.logobox}>
          <Image
            src="/logo.svg"
            alt="Ruffle Logo"
            height={30}
            width={91}
            priority
          />
          <Text size="lg" className={classes.tagline}>
            Putting Flash back on the web
          </Text>
        </Container>
        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          {socials}
        </Group>
      </Container>
    </div>
  );
}
