"use client";

import {
  Container,
  Group,
  List,
  ListItem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "./avm2.module.css";
import { ClassBox } from "@/app/compatibility/avm2/class_box";
import {
  getReportByNamespace,
  NamespaceStatus,
} from "@/app/compatibility/avm2/report_utils";
import {
  IconDone,
  IconMissing,
  IconStub,
} from "@/app/compatibility/avm2/icons";
import Link from "next/link";
import { useTranslation, Trans } from "@/app/translate";

function NamespaceBox(props: NamespaceStatus) {
  const { t } = useTranslation();
  return (
    <Stack className={classes.namespace}>
      <Title order={2}>{props.name || t("compatibility.avm2.top-level")}</Title>
      <Group align="baseline">
        {Object.entries(props.classes).map(([classname, classinfo]) => (
          <ClassBox key={classname} {...classinfo} />
        ))}
      </Group>
    </Stack>
  );
}

export default function Page() {
  const { t } = useTranslation();
  const [byNamespace, setByNamespace] = useState<
    { [name: string]: NamespaceStatus } | undefined
  >(undefined);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const byNamespace = await getReportByNamespace();
        setByNamespace(byNamespace);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group align="top" wrap="nowrap">
          <Image
            src="/undraw/undraw_progress_overview_re_tvcl.svg"
            alt="Person viewing ActionScript classes"
            width={208}
            height={200}
            priority
            className={classes.progressImage}
          />
          <Stack className={classes.actionscriptInfo}>
            <Title className={classes.title}>
              {t("compatibility.avm2.title")}
            </Title>
            <Text>{t("compatibility.avm2.description")}</Text>
            <Text>{t("compatibility.avm2.classification")}</Text>
            <List spacing="sm">
              <ListItem icon={<IconDone />}>
                <Trans
                  i18nKey="compatibility.avm2.implemented-description"
                  components={[
                    <b key="implemented">
                      {t("compatibility.avm2.implemented")}
                    </b>,
                  ]}
                />
              </ListItem>
              <ListItem icon={<IconStub />}>
                <Trans
                  i18nKey="compatibility.avm2.partial-description"
                  components={[
                    <b key="partial">{t("compatibility.avm2.partial")}</b>,
                  ]}
                />
              </ListItem>
              <ListItem icon={<IconMissing />}>
                <Trans
                  i18nKey="compatibility.avm2.missing-description"
                  components={[
                    <b key="missing">{t("compatibility.avm2.missing")}</b>,
                  ]}
                />
              </ListItem>
            </List>
            <Text>
              <Trans
                i18nKey="compatibility.avm2.tree"
                components={[
                  <Link
                    key="link"
                    href="/compatibility/avm2/tree.svg"
                    target="_blank"
                  >
                    {t("compatibility.avm2.tree-link")}
                  </Link>,
                ]}
              />
            </Text>
          </Stack>
        </Group>

        <Stack gap="xl" className={classes.listContainer}>
          {byNamespace
            ? Object.entries(byNamespace).map(([namespace, info]) => (
                <NamespaceBox key={namespace} {...info} />
              ))
            : ""}
        </Stack>
      </Stack>
    </Container>
  );
}
