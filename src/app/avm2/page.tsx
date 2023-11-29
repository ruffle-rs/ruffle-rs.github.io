import { permanentRedirect } from "next/navigation";

/*
  This is a redirect from /avm2.html to /compatibility/avm2
  For the real avm2 page, see /src/app/compatibility/avm2/page.tsx
 */

export default function Page() {
  permanentRedirect("/compatibility/avm2");
}
