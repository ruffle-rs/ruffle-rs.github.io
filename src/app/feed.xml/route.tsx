import { Feed } from "feed";
import { getSortedPostsData } from "@/app/blog/utils";

export async function GET() {
  const posts = getSortedPostsData();
  const feed = new Feed({
    title: "Ruffle Blog",
    description:
      "The latest news for Ruffle, the Flash Player emulator written in Rust.",
    id: "https://ruffle.rs/feed.xml",
    language: "en",
    image: "https://ruffle.rs/favicon-180.png",
    favicon: "https://ruffle.rs/favicon-180.png",
    copyright: `Copyright Ruffle, ${new Date().getFullYear()}`,
    updated:
      posts.length == 0
        ? undefined
        : new Date(
            Number(posts[0].year),
            Number(posts[0].month),
            Number(posts[0].date),
          ),
    feedLinks: {
      atom: "https://ruffle.rs/feed.xml",
    },
  });

  for (const post of posts) {
    feed.addItem({
      date: new Date(Number(post.year), Number(post.month), Number(post.date)),
      link: `https://ruffle.rs/blog/${post.year}/${post.month}/${post.date}/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      author: [{ name: post.author }],
    });
  }

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
