import { Card, Group, Stack, Text, Title } from "@mantine/core";
import classes from "./sponsors.module.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Sponsor {
  name: string;
  logo: string;
  url: string;
}

const sponsors: Sponsor[] = [
  {
    name: "Newgrounds.com",
    url: "https://www.newgrounds.com",
    logo: "/sponsors/newgrounds.png",
  },
  {
    name: "CPMStar",
    url: "https://www.cpmstar.com",
    logo: "/sponsors/cpmstar.png",
  },
  {
    name: "Sébastien Bénard",
    url: "https://deepnight.net",
    logo: "/sponsors/deepnight.png",
  },
  {
    name: "Crazy Games",
    url: "https://www.crazygames.com",
    logo: "/sponsors/crazygames.png",
  },
  {
    name: "Cool Math Games",
    url: "https://www.coolmathgames.com",
    logo: "/sponsors/coolmathgames.png",
  },
  {
    name: "The New York Times",
    url: "https://www.nytimes.com",
    logo: "/sponsors/nyt.png",
  },
  {
    name: "Armor Games",
    url: "https://www.armorgames.com",
    logo: "/sponsors/armorgames.png",
  },
  {
    name: "Onda Educa",
    url: "https://www.ondaeduca.com",
    logo: "/sponsors/ondaeduca.png",
  },
  {
    name: "TwoPlayerGames.org",
    url: "https://www.twoplayergames.org",
    logo: "/sponsors/twoplayergames.png",
  },
  {
    name: "wowgame.jp",
    url: "https://www.wowgame.jp",
    logo: "/sponsors/wowgame.png",
  },
  {
    name: "Matt Roszak",
    url: "http://kupogames.com",
    logo: "/sponsors/mattroszak.png",
  },
  {
    name: "Doll Divine",
    url: "https://www.dolldivine.com",
    logo: "/sponsors/dolldivine.png",
  },
  {
    name: "Movavi",
    url: "https://movavi.com",
    logo: "/sponsors/movavi.svg",
  },
  {
    name: "Kongregate",
    url: "https://www.kongregate.com",
    logo: "/sponsors/kongregate.svg",
  },
  {
    name: "Bubble Shooter",
    url: "https://www.bubbleshooter.net",
    logo: "/sponsors/bubble-shooter.png",
  },
  {
    name: "Neopets",
    url: "https://www.neopets.com",
    logo: "/sponsors/neopets.png",
  },
  {
    name: "Artix Entertainment",
    url: "https://www.artix.com",
    logo: "/sponsors/artix.png",
  },
];

function Sponsor(sponsor: Sponsor) {
  return (
    <Card className={classes.card} radius="lg">
      <Stack align="center">
        <Link href={sponsor.url} target="_blank">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={200}
            height={200}
            className={classes.logo}
          />
        </Link>
        <Link href={sponsor.url} target="_blank" className={classes.link}>
          {sponsor.name}
        </Link>
      </Stack>
    </Card>
  );
}

export function SponsorList() {
  return (
    <Stack className={classes.list}>
      <Title id="sponsors">💎 Diamond Sponsors</Title>
      <Text>
        We'd like to thank all of our sponsors, who help make this project
        possible. Below are our Diamond level sponsors, without whom we would
        not be here. Thank you.
      </Text>
      <Group justify="center" gap="sm">
        {sponsors.map((sponsor, index) => (
          <Sponsor key={index} {...sponsor} />
        ))}
      </Group>
    </Stack>
  );
}
