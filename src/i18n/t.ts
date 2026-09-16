import messages from "i18n:messages";

export const locale = process.env.NEXT_PUBLIC_BUILD_LOCALE || "en-US";

export function t(
  key: string,
  params?: Record<string, string | number>,
): string {
  const message = (messages as Record<string, string>)[key] ?? key;
  if (!params) return message;
  return message.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`));
}
