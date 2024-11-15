"use client";

import { rem, ThemeIcon } from "@mantine/core";
import { IconCheck, IconProgress, IconX } from "@tabler/icons-react";
import { useTranslation } from "@/app/translate";

export function IconDone() {
  const { t } = useTranslation();
  return (
    <ThemeIcon
      size={20}
      radius="xl"
      color="var(--mantine-color-green-9)"
      title={t("compatibility.avm2.done")}
    >
      <IconCheck
        color="white"
        style={{ width: rem(12), height: rem(12) }}
        stroke={4}
      />
    </ThemeIcon>
  );
}

export function IconStub() {
  const { t } = useTranslation();
  return (
    <ThemeIcon size={20} radius="xl" title={t("compatibility.avm2.partial")}>
      <IconProgress
        color="#3c1518"
        style={{ width: rem(12), height: rem(12) }}
        stroke={4}
      />
    </ThemeIcon>
  );
}

export function IconMissing() {
  const { t } = useTranslation();
  return (
    <ThemeIcon
      size={20}
      radius="xl"
      color="#3c1518"
      title={t("compatibility.avm2.missing")}
    >
      <IconX
        color="white"
        style={{ width: rem(12), height: rem(12) }}
        stroke={4}
      />
    </ThemeIcon>
  );
}

export function ProgressIcon(type: "stub" | "missing" | "done") {
  switch (type) {
    case "stub":
      return <IconStub />;
    case "missing":
      return <IconMissing />;
    case "done":
      return <IconDone />;
  }
}
