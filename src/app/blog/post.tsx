import { PostMetadata } from "@/app/blog/utils";
import { Group, Stack, Text } from "@mantine/core";
import classes from "@/app/blog/post.module.css";
import Link from "next/link";
import Markdown from "react-markdown";
import Image from "next/image";
import rehypeRaw from "rehype-raw";

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

export function BlogPost({ metadata, type }: BlogPostProps) {
  const url = `/blog/${metadata.year}/${metadata.month}/${metadata.date}/${metadata.slug}`;
  return (
    <Stack gap={0} className={classes.postInfo}>
      <Link href={url} className={classes.title}>
        {metadata.title}
      </Link>
      <Group wrap="nowrap" gap="xs" className={classes.info}>
        <Group gap="xs" wrap="nowrap">
          <Text size="sm">{metadata.author}</Text>
        </Group>
        <Text size="xs" c="dimmed">
          •
        </Text>
        <Text size="sm" c="dimmed">
          {metadata.year}-{metadata.month}-{metadata.date}
        </Text>
      </Group>
      <div>
        <Markdown
          className={type == "excerpt" ? classes.excerpt : classes.contents}
          rehypePlugins={[rehypeRaw]}
          components={{
            a(props) {
              return (
                <Link href={props.href || "#"} target="_blank">
                  {props.children}
                </Link>
              );
            },
          }}
        >
          {type == "excerpt" ? metadata.excerpt : metadata.content}
        </Markdown>
      </div>
      {type == "excerpt" && (
        <Text className={classes.readMore}>
          <Link href={url}>Read More...</Link>
        </Text>
      )}
    </Stack>
  );
}
