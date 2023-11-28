import classes from "./avm.module.css";
import {
  Button,
  ProgressLabel,
  ProgressRoot,
  ProgressSection,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

interface AvmBlockProps {
  name: string;
  children: React.ReactNode;
  language_done: number;
  api_done: number;
  api_stubbed?: number;
  info_link: string;
  info_link_target?: string;
}

export function AvmBlock(props: AvmBlockProps) {
  return (
    <Stack className={classes.avm}>
      <Title order={2}>{props.name}</Title>
      {props.children}

      <ProgressRoot size="xl" radius={10} mt="auto">
        <ProgressSection
          value={props.language_done}
          color="var(--mantine-color-green-9)"
        >
          <ProgressLabel>Language: {props.language_done}%</ProgressLabel>
        </ProgressSection>
      </ProgressRoot>

      <ProgressRoot size="xl" radius={10}>
        <ProgressSection
          value={props.api_done}
          color="var(--mantine-color-green-9)"
        >
          <ProgressLabel>API: {props.api_done}%</ProgressLabel>
        </ProgressSection>
        {props.api_stubbed && (
          <ProgressSection
            value={props.api_stubbed}
            color="ruffle-orange"
            className={classes.stub}
          >
            <ProgressLabel
              className={classes.stubLabel}
              title={`Stubs: ${props.api_stubbed}%`}
            >
              Stubs: {props.api_stubbed}%
            </ProgressLabel>
          </ProgressSection>
        )}
      </ProgressRoot>

      <Button
        component={Link}
        href={props.info_link}
        target={props.info_link_target}
        size="compact-md"
        color="var(--ruffle-blue-7)"
      >
        More Info
      </Button>
    </Stack>
  );
}
