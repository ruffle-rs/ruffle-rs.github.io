import dynamic from "next/dynamic";
import classes from "./index.module.css";
import {
  Container,
  List,
  ListItem,
  rem,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import Image from "next/image";
import { IconCheck } from "@tabler/icons-react";
import React from "react";

const InteractiveLogo = dynamic(() => import("../components/logo"), {
  ssr: false,
});

const Installers = dynamic(() => import("./installers"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  return (
    <Container size="xl" className={classes.container}>
      <InteractiveLogo className={classes.logo} />

      <Container size="md">
        <Title className={classes.title}>
          An open source Flash Player emulator
        </Title>
        <div className={classes.hero}>
          <Image
            className={classes.heroImage}
            src="/undraw/undraw_online_media_re_r9qv.svg"
            alt="Person installing Ruffle"
            width={375}
            height={366}
          />
          <div className={classes.heroInner}>
            <Text mt="md">
              Made to run natively on all modern operating systems and browsers,
              Ruffle brings Flash content back to life with no extra fuss.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck
                    color="#3c1518"
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={3}
                  />
                </ThemeIcon>
              }
            >
              <ListItem>
                <b className={classes.key}>Safe to use</b> - Using the
                guarantees of Rust and WASM, we avoid the security pitfalls
                Flash was known for.
              </ListItem>
              <ListItem>
                <b className={classes.key}>Easy to install</b> - Whether
                you&apos;re a user or a website owner, we&apos;ve made it as
                easy as possible to get up and running.
              </ListItem>
              <ListItem>
                <b className={classes.key}>Free and open source</b> - Licensed
                MIT/Apache 2.0, you&apos;re free to use Ruffle how you please!
              </ListItem>
            </List>

            <Installers />
          </div>
        </div>
      </Container>
    </Container>
  );
}
