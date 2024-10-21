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
    updated: posts.length == 0 ? undefined : posts[0].date,
    feedLinks: {
      atom: "https://ruffle.rs/feed.xml",
    },
  });

  for (const post of posts) {
    feed.addItem({
      date: post.date,
      link: `https://ruffle.rs/blog/${post.year}/${post.month}/${post.day}/${post.slug}`,
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

export const dynamic = "force-static";
