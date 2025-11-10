"use client";
import { BarChart } from "@mantine/charts";
import { Paper, Text } from "@mantine/core";
import classes from "./weekly_contributions.module.css";

interface DataPoint {
  week: string;
  Commits: number;
}

interface ChartTooltipProps {
  label?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: readonly Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload || !label) return null;

  const commits = payload.find((item) => item.name == "Commits");
  if (!commits) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {commits.value} commits on the week of {label}
      </Text>
    </Paper>
  );
}

export function WeeklyContributions({ data }: { data: DataPoint[] }) {
  return (
    <BarChart
      h={300}
      w="100%"
      data={data}
      // This manually updated grid property is a workaround for https://github.com/mantinedev/mantine/issues/8110,
      // a regression with switching to Recharts 3. TODO: Remove when fixed.
      gridProps={{ yAxisId: "left" }}
      dataKey="week"
      series={[{ name: "Commits", color: "ruffle-orange" }]}
      tooltipProps={{
        content: ({ label, payload }) => (
          <ChartTooltip label={label} payload={payload} />
        ),
      }}
      className={classes.chart}
    />
  );
}
