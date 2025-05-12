"use client";

import { rem, ThemeIcon } from "@mantine/core";
import { IconCheck, IconProgress, IconX } from "@tabler/icons-react";

export function IconDone() {
  return (
    <ThemeIcon
      size={20}
      radius="xl"
      color="var(--mantine-color-green-9)"
      title="Done"
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
  return (
    <ThemeIcon size={20} radius="xl" title="Partial">
      <IconProgress
        color="#3c1518"
        style={{ width: rem(12), height: rem(12) }}
        stroke={4}
      />
    </ThemeIcon>
  );
}

export function IconMissing() {
  return (
    <ThemeIcon size={20} radius="xl" color="#3c1518" title="Missing">
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
