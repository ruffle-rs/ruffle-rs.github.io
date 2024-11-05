import { Container, Flex, Group, Stack, Text } from "@mantine/core";
import classes from "./compatibility.module.css";
import { AvmBlock } from "@/app/compatibility/avm";
import Image from "next/image";
import React from "react";
import { Title } from "@mantine/core";
import { List, ListItem } from "@mantine/core";
import { WeeklyContributions } from "@/app/compatibility/weekly_contributions";
import {
  fetchReport,
  getAVM1Progress,
  getWeeklyContributions,
} from "@/app/downloads/github";

export default async function Downloads() {
  const contributions = await getWeeklyContributions();
  const data = contributions.data.map((item) => {
    return {
      week: new Date(item.week * 1000).toISOString().split("T")[0],
      Commits: item.total,
    };
  });
  const avm1ApiDone = await getAVM1Progress();
  const report = await fetchReport();
  if (!report) {
    return;
  }
  const summary = report.summary;
  const maxPoints = summary.max_points;
  const implPoints = summary.impl_points;
  const stubPenalty = summary.stub_penalty;
  const avm2ApiDone = Math.round(
    ((implPoints - stubPenalty) / maxPoints) * 100,
  );
  const avm2ApiStubbed = Math.round((stubPenalty / maxPoints) * 100);

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
            <Title className={classes.title}>ActionScript Compatibility</Title>
            <Text>
              The biggest factor in content compatibility is ActionScript; the
              language that powers interactivity in games and applications made
              with Flash. All Flash content falls in one of two categories,
              depending on which version of the language was used to create it.
            </Text>
            <Text>
              We track our progress in each AVM by splitting them up into two
              different areas:
            </Text>
            <List>
              <ListItem>
                The <b>Language</b> is the underlying virtual machine itself and
                the language concepts that it understands, like variables and
                classes and how they all interact together.
              </ListItem>
              <ListItem>
                The <b>API</b> is the original built-in methods and classes that
                are available for this AVM, like the ability to interact with
                objects on the stage or make web requests.
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
            name="AVM 1: ActionScript 1 & 2"
            language={{ done: 95 }}
            api={{ done: avm1ApiDone }}
            info_link_target="_blank"
            info_link="https://github.com/ruffle-rs/ruffle/issues/310"
          >
            <Text>
              AVM 1 is the original ActionScript Virtual Machine. All movies
              made before Flash Player 9 (June 2006) will be made with AVM 1,
              and it remained supported &amp; available to authors until the
              release of Flash Professional CC (2013), after which point content
              started moving to AVM 2.
            </Text>
            <Text>
              We believe that most AVM 1 content will work, but we are aware of
              some graphical inaccuracies and smaller bugs here and there.
              Please feel free to report any issues you find that are not
              present in the original Flash Player!
            </Text>
          </AvmBlock>

          <AvmBlock
            name="AVM 2: ActionScript 3"
            language={{ done: 90 }}
            api={{ done: avm2ApiDone, stubbed: avm2ApiStubbed }}
            info_link="/compatibility/avm2"
          >
            <Text>
              AVM 2 was introduced with Flash Player 9 (June 2006), to replace
              the earlier AVM 1. After the release of Flash Professional CC
              (2013), authors are required to use ActionScript 3 - making any
              movie made after that date very likely to fall under this
              category.
            </Text>
            <Text>
              Ruffle now has decent support for AVM 2, and it&apos;s our
              experience that most games will work well enough to be played.
              We&apos;re still rapidly improving in this area though, so bug
              reports about any broken content are always welcome!
            </Text>
          </AvmBlock>
        </Flex>

        <Stack w="100%" align="center">
          <Title order={2}>Weekly Contributions</Title>
          <WeeklyContributions data={data} />
        </Stack>
      </Stack>
    </Container>
  );
}
