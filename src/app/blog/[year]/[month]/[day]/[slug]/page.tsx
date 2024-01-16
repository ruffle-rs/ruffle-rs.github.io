import { getPostData, getSortedPostsData, PostPath } from "@/app/blog/utils";
import { Container } from "@mantine/core";
import { BlogPost } from "@/app/blog/post";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: PostPath;
}): Promise<Metadata> {
  const post = getPostData(
    `${params.year}-${params.month}-${params.day}-${params.slug}.markdown`,
  );
  const baseUrl = process.env.BASE_URL || "";
  return {
    title: `${post.title} - Ruffle`,
    description: post.excerpt.split("\n")[0].trim(),
    metadataBase: baseUrl ? new URL(baseUrl) : null,
    openGraph: {
      type: "article",
      title: post.title,
      siteName: "Ruffle",
      publishedTime: post.date.toISOString(),
      authors: [post.author],
      images: post.images?.map((path) => baseUrl + path),
      videos: post.videos?.map((path) => baseUrl + path),
    },
  };
}

export default function Page({ params }: { params: PostPath }) {
  const post = getPostData(
    `${params.year}-${params.month}-${params.day}-${params.slug}.markdown`,
  );
  return (
    <Container size="xl">
      <BlogPost metadata={post} type="full" />
    </Container>
  );
}

export async function generateStaticParams() {
  return getSortedPostsData();
}
