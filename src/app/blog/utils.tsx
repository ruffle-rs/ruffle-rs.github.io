import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const postsDirectory = path.join(process.cwd(), "blog_posts");

/**
 * This is the block of settings at the top of each blog post file.
 */
interface PostInformation {
  title: string;
  author: string;
  icon: string;
  images?: string[];
  videos?: string[];
}

export interface PostPath {
  year: string;
  month: string;
  day: string;
  slug: string;
}

export interface PostMetadata extends PostInformation, PostPath {
  date: Date;
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

  const [year, month, day] = id.slice(0, 10).split("-");
  const slug = id.substring(11);
  // Combine the data with the id
  return {
    ...(matterResult.data as PostInformation),
    excerpt: matterResult.excerpt || "",
    content: matterResult.content,
    year,
    month,
    day,
    date: new Date(Number(year), Number(month) - 1, Number(day)),
    slug,
  };
}

export function getSortedPostsData(): PostMetadata[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(getPostData);
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
