import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "blog_posts");

/**
 * This is the block of settings at the top of each blog post file.
 */
interface PostInformation {
  title: string;
  author: string;
  icon: string;
}

export interface PostPath {
  year: string;
  month: string;
  date: string;
  slug: string;
}

export interface PostMetadata extends PostInformation, PostPath {
  excerpt: string;
  content: string;
}

export function getPostData(filename: string): PostMetadata {
  // Remove ".markdown" from file name to get id
  const id = filename.replace(/\.markdown$/, "");

  // Read markdown file as string
  const fullPath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, { excerpt: true });

  const date = id.slice(0, 10).split("-");
  const slug = id.substring(11);
  // Combine the data with the id
  return {
    ...(matterResult.data as PostInformation),
    excerpt: matterResult.excerpt || "",
    content: matterResult.content,
    year: date[0],
    month: date[1],
    date: date[2],
    slug: slug,
  };
}

export function getSortedPostsData(): PostMetadata[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(getPostData);
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (
      new Date(Number(a.year), Number(a.month), Number(a.date)) <
      new Date(Number(b.year), Number(b.month), Number(b.date))
    ) {
      return 1;
    } else {
      return -1;
    }
  });
}
