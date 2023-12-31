import { getSortedPostsData } from "@/app/blog/utils";
import { Container, Stack } from "@mantine/core";
import { BlogPostAndIcon } from "@/app/blog/post";

export default function BlogPostList() {
  const posts = getSortedPostsData();
  return (
    <Container size="xl">
      <Stack>
        {posts.map((post, index) => (
          <BlogPostAndIcon key={index} metadata={post} type="excerpt" />
        ))}
      </Stack>
    </Container>
  );
}
