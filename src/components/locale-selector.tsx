"use client";

import { usePathname } from "next/navigation";
import classes from "./locale-selector.module.css";

interface Props {
  locales: { code: string; name: string }[];
  defaultLocale: string;
  currentLocale: string;
}

export function LocaleSelector({
  locales,
  defaultLocale,
  currentLocale,
}: Props) {
  const pathname = usePathname();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = e.target.value;
    window.location.href =
      code === defaultLocale ? pathname : `/${code}${pathname}`;
  }

  return (
    <select
      value={currentLocale}
      onChange={onChange}
      className={classes.select}
    >
      {locales.map(({ code, name }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
