import {
  Container,
  Group,
  List,
  ListItem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import classes from "./contribute.module.css";
import React from "react";
import Image from "next/image";
import { IconBrandRust, IconBrandTypescript } from "@tabler/icons-react";
import Link from "next/link";
import { SponsorList } from "@/app/contribute/sponsors";

function ContributeCode() {
  return (
    <Stack className={classes.contributeSection}>
      <Title className={classes.title}>🖥️ Contribute code</Title>
      <Text>
        There's a few different codebases in couple of different languages, and
        we'd welcome any help to try and maintain and improve them.
      </Text>
      <List>
        <ListItem icon={<IconBrandRust />}>
          The actual{" "}
          <Link target="_blank" href="https://github.com/ruffle-rs/ruffle/">
            emulator
          </Link>{" "}
          itself, and all of the{" "}
          <Link
            target="_blank"
            href="https://github.com/ruffle-rs/ruffle/tree/master/desktop"
          >
            desktop player
          </Link>
          , is written in Rust.
        </ListItem>
        <ListItem icon={<IconBrandTypescript />}>
          The{" "}
          <Link
            target="_blank"
            href="https://github.com/ruffle-rs/ruffle/tree/master/web"
          >
            web player
          </Link>
          , the{" "}
          <Link
            target="_blank"
            href="https://github.com/ruffle-rs/ruffle/tree/master/web/packages/extension"
          >
            extension
          </Link>{" "}
          and our{" "}
          <Link
            target="_blank"
            href="https://github.com/ruffle-rs/ruffle-rs.github.io"
          >
            website
          </Link>{" "}
          is written in TypeScript.
        </ListItem>
      </List>
      <Text>
        Check out our{" "}
        <Link
          target="_blank"
          href="https://github.com/ruffle-rs/ruffle/blob/master/CONTRIBUTING.md"
        >
          Contributing Guidelines
        </Link>{" "}
        for information on how to start, and come join our{" "}
        <Link target="_blank" href="https://discord.gg/ruffle">
          Discord
        </Link>{" "}
        if you need help!
      </Text>
    </Stack>
  );
}

function TestContent() {
  return (
    <Stack className={classes.contributeSection}>
      <Title className={classes.title}>🕹️ Test content</Title>
      <Text>
        Arguably more important than contributing code is testing Ruffle out. Go
        install Ruffle and try out your favourite games and animations. Look for
        any difference from the official Flash Player, and report your findings
        to us.
      </Text>
      <Text>
        If you find any bugs, changes of behaviour, performance issues or any
        visual differences then please report those to{" "}
        <Link target="_blank" href="https://github.com/ruffle-rs/ruffle/issues">
          our bug tracker
        </Link>
        .
      </Text>
      <Text>
        If it runs flawlessly, come share the good news on{" "}
        <Link target="_blank" href="https://discord.gg/ruffle">
          our Discord
        </Link>
        !
      </Text>
    </Stack>
  );
}

function Sponsorship() {
  return (
    <Stack className={classes.contributeSection}>
      <Title className={classes.title}>💲 Sponsor the project</Title>
      <Text>
        If you are able and willing to, we welcome any and all financial support
        to help us fund the project going forward. With your help, we can afford
        to spend more time dedicated to Ruffle, as well as pay for expenses such
        as build servers &amp; hosting. We accept donations and sponsorships of
        any kind, big or small, through Open Source Collective 501(c)(6).
      </Text>
      <Text>
        For more information, or to view the options available for sponsoring
        the project, please visit{" "}
        <Link target="_blank" href="https://opencollective.com/ruffle">
          our Open Collective page
        </Link>
        .
      </Text>
    </Stack>
  );
}

function SpreadTheWord() {
  return (
    <Stack className={classes.contributeSection}>
      <Title className={classes.title}>💬 Spread the word!</Title>
      <Text>
        Is your favourite Flash-based site shutting down? Let them know they can
        add one JavaScript file and keep it running! Feeling nostalgic for some
        old Flash games? Go play some on Newgrounds with Ruffle installed, and
        tell your friends about it! Maybe you're a streamer and looking for some
        silly content? There's literally decades worth, now unlocked and
        accessible once more.
      </Text>
    </Stack>
  );
}

export default function Page() {
  return (
    <Container size="xl" className={classes.container}>
      <Group align="top" wrap="nowrap">
        <Image
          src="/undraw/undraw_super_thank_you_re_f8bo.svg"
          alt="Person thanking you"
          width={185}
          height={200}
          priority
          className={classes.image}
        />
        <Stack className={classes.actionscriptInfo}>
          <Title className={classes.title}>Get Involved</Title>
          <Text>
            Ruffle is an entirely open source project, maintained by volunteers
            like you who just want to help preserve a slice of history. We rely
            on contributions of any kind to keep this project going, and
            absolutely would not have come as far as we have without the amazing
            support of our community who came together to make Ruffle happen. If
            you'd like to join them, there are many ways to help make Ruffle
            better than ever!
          </Text>
        </Stack>
      </Group>

      <Group align="baseline" justify="space-between">
        <ContributeCode />
        <TestContent />
        <Sponsorship />
        <SpreadTheWord />
      </Group>

      <SponsorList />
    </Container>
  );
}
