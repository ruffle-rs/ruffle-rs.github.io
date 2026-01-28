// Hacky pass through re-export of next/link's Link component
// Fixes a bug with Next.js 16, client components, and the Link component
// TODO: Remove when https://github.com/vercel/next.js/issues/85604 is fixed
"use client";

import Link from "next/link";

export default Link;
