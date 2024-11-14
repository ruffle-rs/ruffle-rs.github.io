"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import classes from "../app/index.module.css";
import { t } from "@/app/translate";

declare global {
  interface Window {
    RufflePlayer: PublicAPI;
  }

  interface PublicAPI {
    newest(): SourceAPI;
  }

  interface SourceAPI {
    createPlayer(): RufflePlayer;
  }

  interface RufflePlayer extends HTMLElement {
    load(options: object): Promise<void>;
  }
}

interface LogoProps {
  className?: string;
}

export default function InteractiveLogo({ className }: LogoProps) {
  const container = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<RufflePlayer | null>(null);

  const removeRufflePlayer = () => {
    player?.remove();
    setPlayer(null);
  };

  const loadPlayer = () => {
    if (player) {
      return;
    }

    const rufflePlayer = (window.RufflePlayer as PublicAPI)
      ?.newest()
      ?.createPlayer();

    if (rufflePlayer) {
      container.current!.appendChild(rufflePlayer);

      rufflePlayer
        .load({
          url: "/logo-anim.swf",
          autoplay: "on",
          unmuteOverlay: "hidden",
          backgroundColor: "#37528C",
          contextMenu: "off",
          splashScreen: false,
          preferredRenderer: "canvas",
        })
        .catch(() => {
          removeRufflePlayer();
        });
      rufflePlayer.style.width = "100%";
      rufflePlayer.style.height = "100%";
      setPlayer(rufflePlayer);
    }
  };

  useEffect(() => {
    loadPlayer();
    return () => removeRufflePlayer();
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/@ruffle-rs/ruffle"
        onReady={() => loadPlayer()}
      />
      <div ref={container} className={className}>
        <Image
          src="/logo.svg"
          alt={t("logo.alt-tag")}
          className={player ? classes.hidden : classes.staticLogo}
          width="340"
          height="110"
        />
      </div>
    </>
  );
}
