"use client";

import React, { useEffect, useState } from "react";
import { Container, Flex, Group, Stack, Text } from "@mantine/core";
import classes from "./compatibility.module.css";
import { AvmBlock } from "@/app/compatibility/avm";
import Image from "next/image";
import { Title } from "@mantine/core";
import { List, ListItem } from "@mantine/core";
import { WeeklyContributions } from "@/app/compatibility/weekly_contributions";
import {
  getAVM1Progress,
  getWeeklyContributions,
} from "@/app/downloads/github";
import { useTranslation, Trans } from "@/app/translate";

interface DataPoint {
  week: string;
  Commits: number;
}

export default function Downloads() {
  const { t } = useTranslation();
  const [data, setData] = useState<DataPoint[]>([]);
  const [avm1ApiDone, setAvm1ApiDone] = useState<number>(0);
  const [avm2ApiDone, setAvm2ApiDone] = useState<number>(0);
  const [avm2ApiStubbed, setAvm2ApiStubbed] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weekly contributions
        const contributionsRes = await getWeeklyContributions();
        const contributionsData = contributionsRes.data.map((item) => ({
          week: new Date(item.week * 1000).toISOString().split("T")[0],
          Commits: item.total,
        }));
        setData(contributionsData);

        // Fetch AVM1 progress
        const avm1ApiRes = await getAVM1Progress();
        setAvm1ApiDone(avm1ApiRes);

        // Fetch report
        const reportReq = await fetch("/compatibility/fetch-report");
        const reportRes = await reportReq.json();
        if (reportRes) {
          const { summary } = reportRes;
          const maxPoints = summary.max_points;
          const implPoints = summary.impl_points;
          const stubPenalty = summary.stub_penalty;

          const avm2ApiDone = Math.round(
            ((implPoints - stubPenalty) / maxPoints) * 100,
          );
          setAvm2ApiDone(avm2ApiDone);

          const avm2ApiStubbed = Math.round((stubPenalty / maxPoints) * 100);
          setAvm2ApiStubbed(avm2ApiStubbed);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container size="xl" className={classes.container}>
      <Stack gap="xl" align="center">
        <Group align="top" wrap="nowrap">
          <Image
            src="/undraw/undraw_split_testing_l1uw.svg"
            alt="Person comparing Ruffle compatibility"
            width={219}
            height={200}
            priority
            className={classes.actionscriptImage}
          />
          <Stack className={classes.actionscriptInfo}>
            <Title className={classes.title}>{t("compatibility.title")}</Title>
            <Text>{t("compatibility.description")}</Text>
            <Text>{t("compatibility.tracking")}</Text>
            <List>
              <ListItem>
                <Trans
                  i18nKey="compatibility.language-description"
                  components={[
                    <b key="language">{t("compatibility.language")}</b>,
                  ]}
                />
              </ListItem>
              <ListItem>
                <Trans
                  i18nKey="compatibility.api-description"
                  components={[<b key="api">{t("compatibility.api")}</b>]}
                />
              </ListItem>
            </List>
          </Stack>
        </Group>

        <Flex
          align="top"
          justify="space-between"
          columnGap={40}
          rowGap={50}
          className={classes.avms}
        >
          <AvmBlock
            name="compatibility.avm1"
            language={{ done: 95 }}
            api={{ done: avm1ApiDone }}
            info_link_target="_blank"
            info_link="https://github.com/ruffle-rs/ruffle/issues/310"
          >
            <Text>{t("compatibility.avm1-description")}</Text>
            <Text>{t("compatibility.avm1-support")}</Text>
          </AvmBlock>

          <AvmBlock
            name="compatibility.avm2"
            language={{ done: 90 }}
            api={{ done: avm2ApiDone, stubbed: avm2ApiStubbed }}
            info_link="/compatibility/avm2"
          >
            <Text>{t("compatibility.avm2-description")}</Text>
            <Text>{t("compatibility.avm2-support")}</Text>
          </AvmBlock>
        </Flex>

        {data && (
          <Stack w="100%" align="center">
            <Title order={2}>{t("compatibility.weekly-contributions")}</Title>
            <WeeklyContributions data={data} />
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
