"use client";

import { PostMetadata } from "@/app/blog/utils";
import { Group, Stack, Text, Title } from "@mantine/core";
import classes from "@/app/blog/post.module.css";
import Link from "next/link";
import Markdown from "react-markdown";
import Image from "next/image";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { useTranslation } from "@/app/translate";
import React from "react";

export interface BlogPostProps {
  metadata: PostMetadata;
  type: "excerpt" | "full";
}

export function BlogPostAndIcon({ metadata, type }: BlogPostProps) {
  return (
    <Group className={classes.post} gap={0}>
      <Image
        src={metadata.icon || "about:blank"}
        alt={metadata.title}
        width={100}
        height={100}
        className={classes.icon}
      />
      <BlogPost metadata={metadata} type={type} />
    </Group>
  );
}

function processChild(
  child: React.ReactNode,
  t: (key: string) => string,
): React.ReactNode {
  if (typeof child === "string") {
    // Replace all {{key}} occurrences with t("key")
    return child.replace(/{{(.*?)}}/g, (_, key) => t(key.trim()));
  }
  return child; // Return as is if not a string
}

export function BlogPost({ metadata, type }: BlogPostProps) {
  const { t } = useTranslation();
  const url = `/blog/${metadata.year}/${metadata.month}/${metadata.day}/${metadata.slug}`;
  return (
    <Stack gap={0} className={classes.postInfo}>
      {type == "full" ? (
        <Title className={classes.title}>{t(metadata.title)}</Title>
      ) : (
        <Link href={url} className={classes.title}>
          {t(metadata.title)}
        </Link>
      )}
      <Group wrap="nowrap" gap="xs" className={classes.info}>
        <Group gap="xs" wrap="nowrap">
          <Text size="sm">{metadata.author}</Text>
        </Group>
        <Text size="xs" c="dimmed">
          •
        </Text>
        <Text size="sm" c="dimmed">
          {metadata.year}-{metadata.month}-{metadata.day}
        </Text>
      </Group>
      <div>
        <Markdown
          className={type === "excerpt" ? classes.excerpt : classes.contents}
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          components={["a", "p", "h2", "li", "strong", "code", "em"].reduce(
            (acc, tag) => ({
              ...acc,
              [tag]: (props: { children?: React.ReactNode; href?: string }) =>
                tag === "a" ? (
                  <Link href={props.href || "#"} target="_blank">
                    {React.Children.map(props.children, (child) =>
                      processChild(child, t),
                    )}
                  </Link>
                ) : (
                  React.createElement(
                    tag,
                    null,
                    React.Children.map(props.children, (child) =>
                      processChild(child, t),
                    ),
                  )
                ),
            }),
            {},
          )}
        >
          {type == "excerpt" ? metadata.excerpt : metadata.content}
        </Markdown>
      </div>
      {type == "excerpt" && (
        <Text className={classes.readMore}>
          <Link href={url}>{t("blog.read-more")}</Link>
        </Text>
      )}
    </Stack>
  );
}
