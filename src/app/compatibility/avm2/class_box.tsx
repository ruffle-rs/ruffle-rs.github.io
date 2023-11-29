"use client";

import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  Card,
  List,
  ListItem,
  ProgressRoot,
  ProgressSection,
  Title,
} from "@mantine/core";
import classes from "./avm2.module.css";
import React from "react";
import {
  ClassStatus,
  ProgressIcon,
} from "@/app/compatibility/avm2/report_utils";

export function ClassBox(props: ClassStatus) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pctDone = Math.ceil(
    ((props.summary.impl_points - props.summary.stub_penalty) /
      props.summary.max_points) *
      100,
  );
  const pctStub = Math.ceil(
    (props.summary.stub_penalty / props.summary.max_points) * 100,
  );
  return (
    <Card bg="var(--ruffle-blue-9)" className={classes.class}>
      <Title order={4}>{props.name || "(Package level)"}</Title>
      <ProgressRoot size="xl" radius={10} className={classes.progress}>
        <ProgressSection
          striped
          value={pctDone}
          color="var(--mantine-color-green-9)"
          title={`${pctDone}% done`}
        ></ProgressSection>
        {pctStub > 0 && (
          <ProgressSection
            striped
            value={pctStub}
            color="ruffle-orange"
            className={classes.progressStub}
            title={`${pctStub}% partially done`}
          ></ProgressSection>
        )}
      </ProgressRoot>
      {props.items.length > 0 && (
        <>
          <Button
            size="compact-sm"
            className={classes.showMemberButton}
            onClick={toggle}
          >
            Show Missing Members
          </Button>
          <List hidden={!opened}>
            {props.items.map((item, i) => (
              <ListItem key={i} icon={ProgressIcon(item.icon)}>
                <code>{item.name}</code>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Card>
  );
}
