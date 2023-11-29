import classes from "./avm.module.css";
import {
  Button,
  Group,
  ProgressRoot,
  ProgressSection,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

interface AvmProgressProps {
  done: number;
  stubbed?: number;
}

interface AvmProgressPropsFull extends AvmProgressProps {
  name: string;
  mt?: string;
}

function AvmProgress(props: AvmProgressPropsFull) {
  return (
    <Group align="center" justify="spread-between" mt={props.mt}>
      <Text size="sm" className={classes.progressName}>
        {props.name}: {props.done}%
      </Text>
      <ProgressRoot size="xl" radius={10} className={classes.progress}>
        <ProgressSection
          striped
          value={props.done}
          color="var(--mantine-color-green-9)"
          title={`${props.done}% done`}
        ></ProgressSection>
        {props.stubbed && (
          <ProgressSection
            striped
            value={props.stubbed}
            color="ruffle-orange"
            className={classes.stub}
            title={`${props.stubbed}% partially done`}
          ></ProgressSection>
        )}
      </ProgressRoot>
    </Group>
  );
}

interface AvmBlockProps {
  name: string;
  children: React.ReactNode;
  language: AvmProgressProps;
  api: AvmProgressProps;
  info_link: string;
  info_link_target?: string;
}

export function AvmBlock(props: AvmBlockProps) {
  return (
    <Stack className={classes.avm}>
      <Group justify="space-between">
        <Title order={2}>{props.name}</Title>
        <Button
          component={Link}
          href={props.info_link}
          target={props.info_link_target}
          size="compact-md"
          color="var(--ruffle-blue-7)"
        >
          More Info
        </Button>
      </Group>

      {props.children}

      <AvmProgress name="Language" mt="auto" {...props.language} />
      <AvmProgress name="API" {...props.api} />
    </Stack>
  );
}
