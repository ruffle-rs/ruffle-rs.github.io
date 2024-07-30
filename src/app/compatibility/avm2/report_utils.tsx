import { rem, ThemeIcon } from "@mantine/core";
import { IconCheck, IconProgress, IconX } from "@tabler/icons-react";
import { fetchReport } from "@/app/downloads/github";
import React from "react";

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

export interface SummaryStatistics {
  max_points: number;
  impl_points: number;
  stub_penalty: number;
}

export interface ClassStatus {
  summary: SummaryStatistics;
  items: ItemStatus[];
  name: string;
}

export interface ItemStatus {
  icon: "done" | "missing" | "stub";
  name: string;
}

export interface NamespaceStatus {
  name: string;
  summary: SummaryStatistics;
  classes: { [name: string]: ClassStatus };
}

export async function getReportByNamespace(): Promise<
  { [name: string]: NamespaceStatus } | undefined
> {
  let byNamespace: { [name: string]: NamespaceStatus } = {};
  const report = await fetchReport();
  if (!report) {
    return;
  }
  Object.entries(report.classes).map(([itemName, classInfo]) => {
    const nameSplit = itemName.split(/\.(?=[^.]+$)/);
    let className = nameSplit[nameSplit.length - 1];
    let namespace = nameSplit.length == 1 ? "" : nameSplit[0];

    if (nameSplit.length > 1 && /^[a-z]/.test(className)) {
      // This is actually a package like "flash.net" with its own members, not a class
      namespace = itemName;
      className = "";
    }

    if (classInfo.missing.length == 0 && classInfo.stubbed.length == 0) {
      // Ignore this
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(byNamespace, namespace)) {
      byNamespace[namespace] = {
        name: namespace,
        summary: { max_points: 0, impl_points: 0, stub_penalty: 0 },
        classes: {},
      };
    }

    byNamespace[namespace].summary.max_points += classInfo.summary.max_points;
    byNamespace[namespace].summary.impl_points += classInfo.summary.impl_points;
    byNamespace[namespace].summary.stub_penalty +=
      classInfo.summary.stub_penalty;

    const items: ItemStatus[] = [];

    for (const item of classInfo.missing) {
      items.push({ icon: "missing", name: item });
    }
    for (const item of classInfo.stubbed) {
      items.push({ icon: "stub", name: item });
    }

    items.sort((a, b) => a.name.localeCompare(b.name));

    byNamespace[namespace].classes[className] = {
      items,
      name: className,
      summary: classInfo.summary,
    };
  });

  // Sort the result by namespace
  byNamespace = Object.fromEntries(
    Object.entries(byNamespace).sort(([a], [b]) => a.localeCompare(b)),
  );

  for (const name in byNamespace) {
    const info = byNamespace[name];
    info.classes = Object.fromEntries(
      Object.entries(info.classes).sort(([a], [b]) => a.localeCompare(b)),
    );
  }
  return byNamespace;
}

export function displayedPercentage(value: number, max: number): number {
  return value === 0 ? value : Math.max(1, Math.floor((value / max) * 100));
}
