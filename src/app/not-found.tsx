"use client";

import classes from "./not-found.module.css";
import { useTranslation } from "@/app/translate";
import { Stack, Text, Title } from "@mantine/core";
import React from "react";

export default function Home() {
  const { t } = useTranslation();
  return (
    <Stack align="center">
      <Title className={classes.title}>404</Title>
      <Title order={2}>{t("404.not-found")} :(</Title>
      <Text>{t("404.not-found-description")}</Text>
    </Stack>
  );
}
