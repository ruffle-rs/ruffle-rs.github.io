import classes from "./not-found.module.css";
import { Stack, Text, Title } from "@mantine/core";
import React from "react";

export default function Home() {
  return (
    <Stack align="center">
      <Title className={classes.title}>404</Title>
      <Title order={2}>Page not found :(</Title>
      <Text>The requested page could not be found.</Text>
    </Stack>
  );
}
