import { getPostData, getSortedPostsData, PostPath } from "@/app/blog/utils";
import { Container } from "@mantine/core";
import { BlogPost } from "@/app/blog/post";

export default function Page({ params }: { params: PostPath }) {
  const post = getPostData(
    `${params.year}-${params.month}-${params.date}-${params.slug}.markdown`,
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
