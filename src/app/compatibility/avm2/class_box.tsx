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
  displayedPercentage,
} from "@/app/compatibility/avm2/report_utils";
import { ProgressIcon } from "@/app/compatibility/avm2/icons";
import { useTranslation } from "@/app/translate";

export function ClassBox(props: ClassStatus) {
  const { t } = useTranslation();
  const [opened, { toggle }] = useDisclosure(false);
  const pctDone = displayedPercentage(
    props.summary.impl_points - props.summary.stub_penalty,
    props.summary.max_points,
  );
  const pctStub =
    props.summary.impl_points === props.summary.max_points
      ? 100 - pctDone
      : displayedPercentage(
          props.summary.stub_penalty,
          props.summary.max_points,
        );
  return (
    <Card bg="var(--ruffle-blue-9)" className={classes.class}>
      <Title order={4}>
        {props.name || t("compatibility.avm2.package-level")}
      </Title>
      <ProgressRoot size="xl" radius={10} className={classes.progress}>
        <ProgressSection
          striped
          value={pctDone}
          color="var(--mantine-color-green-9)"
          title={`${pctDone}% ${t("compatibility.done")}`}
        ></ProgressSection>
        {pctStub > 0 && (
          <ProgressSection
            striped
            value={pctStub}
            color="ruffle-orange"
            className={classes.progressStub}
            title={`${pctStub}% ${t("compatibility.partial")}`}
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
            {opened
              ? t("compatibility.avm2.hide")
              : t("compatibility.avm2.show")}{" "}
            {t("compatibility.avm2.missing-members")}
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
