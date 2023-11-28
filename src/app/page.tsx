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
  loading: () => <p>Loading...</p>,
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

      {/*<Space h="xl" />*/}
      {/*<Space h="xl" />*/}
      {/*<Space h="xl" />*/}
      {/*<Space h="xl" />*/}
      {/*<Space h="xl" />*/}
      {/*<Space h="xl" />*/}

      {/*<Grid gutter={80}>*/}
      {/*  <GridCol span={4}>*/}
      {/*    <Image*/}
      {/*      src="/undraw/undraw_online_media_re_r9qv.svg"*/}
      {/*      alt="Ruffle Logo"*/}
      {/*      width={0}*/}
      {/*      height={0}*/}
      {/*      style={{ width: "100%", height: "auto" }} // optional*/}
      {/*    />*/}
      {/*  </GridCol>*/}
      {/*  <GridCol span={8}>*/}
      {/*    <p>*/}
      {/*      Ruffle is a Flash Player emulator written in Rust. Ruffle runs*/}
      {/*      natively on all modern operating systems as a standalone*/}
      {/*      application, and on all modern browsers through the use of*/}
      {/*      WebAssembly. Leveraging the safety of the modern browser sandbox and*/}
      {/*      the memory safety guarantees of Rust, we can confidently avoid all*/}
      {/*      the security pitfalls that Flash had a reputation for. Ruffle puts*/}
      {/*      Flash back on the web, where it belongs - including browsers on iOS*/}
      {/*      and Android!*/}
      {/*    </p>*/}

      {/*    <p>*/}
      {/*      Designed to be easy to use and install, users or website owners may*/}
      {/*      install the web version of Ruffle and existing flash content will*/}
      {/*      "just work", with no extra configuration required. Ruffle will*/}
      {/*      detect all existing Flash content on a website and automatically*/}
      {/*      "polyfill" it into a Ruffle player, allowing seamless and*/}
      {/*      transparent upgrading of websites that still rely on Flash content.*/}
      {/*    </p>*/}

      {/*    <p>*/}
      {/*      Ruffle is an entirely open source project maintained by volunteers.*/}
      {/*      We're all passionate about the preservation of internet history, and*/}
      {/*      we were drawn to working on this project to help preserve the many*/}
      {/*      websites and plethora of content that will no longer be accessible*/}
      {/*      when users can no longer run the official Flash Player. If you would*/}
      {/*      like to help support this project, we welcome all contributions of*/}
      {/*      any kind - even if it's just playing some old games and seeing how*/}
      {/*      well they run.*/}
      {/*    </p>*/}
      {/*  </GridCol>*/}
      {/*</Grid>*/}
    </Container>
  );
}
