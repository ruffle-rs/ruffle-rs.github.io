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
import React from "react";
import classes from "./avm2.module.css";
import { ClassBox } from "@/app/compatibility/avm2/class_box";
import {
  getReportByNamespace,
  IconDone,
  IconMissing,
  IconStub,
  NamespaceStatus,
} from "@/app/compatibility/avm2/report_utils";
import Link from "next/link";

function NamespaceBox(props: NamespaceStatus) {
  return (
    <Stack className={classes.namespace}>
      <Title order={2}>{props.name || "(Top Level)"}</Title>
      <Group align="baseline">
        {Object.entries(props.classes).map(([classname, classinfo]) => (
          <ClassBox key={classname} {...classinfo} />
        ))}
      </Group>
    </Stack>
  );
}

export default async function Page() {
  const byNamespace = await getReportByNamespace();
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
            <Title className={classes.title}>ActionScript 3 API Progress</Title>
            <Text>
              ActionScript 3 contains many different methods and classes - not
              all of which is ultimately <i>useful</i> to every application. The
              majority of content only uses a small portion of the available
              API, so even if we aren&apos;t 100% &quot;complete&quot; across
              the entirely of AVM 2, we may have enough for that content to run
              completely fine.
            </Text>
            <Text>
              On this page, we list every single ActionScript 3 API that exists
              but Ruffle does not yet 100% implement. We classify items into
              three different stages:
            </Text>
            <List spacing="sm">
              <ListItem icon={<IconDone />}>
                <b>Implemented</b> items are marked as &quot;Done&quot;, and we
                believe they are fully functional. For brevity, we do not list
                completed items on this page.
              </ListItem>
              <ListItem icon={<IconStub />}>
                <b>Partial</b> items exist and are enough for most content to
                work, but are incomplete. A partial class may be missing items,
                or a method may just simply return a value without performing
                its intended function.
              </ListItem>
              <ListItem icon={<IconMissing />}>
                <b>Missing</b> items do not exist at all in Ruffle yet, and
                trying to use them will give an error.
              </ListItem>
            </List>
            <Text>
              You can also visualize the progress{" "}
              <Link href="/compatibility/avm2/tree.svg" target="_blank">
                as a tree graph
              </Link>
              .
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
