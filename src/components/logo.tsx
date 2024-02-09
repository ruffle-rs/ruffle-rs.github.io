"use client";

import React from "react";
import Script from "next/script";

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

export default class InteractiveLogo extends React.Component<LogoProps> {
  private readonly container: React.RefObject<HTMLDivElement>;
  private player: RufflePlayer | null = null;

  constructor(props: LogoProps) {
    super(props);

    this.container = React.createRef();
  }

  private createStaticLogo() {
    if (this.container.current) {
      const staticLogo = document.createElement("IMG") as HTMLImageElement;
      staticLogo.src = "/logo.svg";
      staticLogo.alt = "Ruffle Logo";
      staticLogo.style.width = "85%";
      staticLogo.style.height = "auto";
      staticLogo.style.margin = "0 auto";
      staticLogo.style.display = "block";
      staticLogo.style.position = "relative";
      staticLogo.style.top = "50%";
      staticLogo.style.transform = "translateY(-50%)";
      this.container.current.textContent = "";
      this.container.current.appendChild(staticLogo);
    }
  }

  private load() {
    if (this.player) {
      // Already loaded.
      return;
    }

    this.player = (window.RufflePlayer as PublicAPI)?.newest()?.createPlayer();

    if (this.player) {
      this.container.current!.appendChild(this.player);

      this.player.load({
        url: "/logo-anim.swf",
        autoplay: "on",
        unmuteOverlay: "hidden",
        backgroundColor: "#37528C",
        contextMenu: "off",
        splashScreen: false,
        preferredRenderer: "canvas",
      }).catch(() => {
        this.createStaticLogo();
      });
      this.player.style.width = "100%";
      this.player.style.height = "100%";
    } else {
      this.createStaticLogo();
    }
  }

  componentWillUnmount() {
    this.player?.remove();
    this.player = null;
  }

  render() {
    return (
      <>
        <Script
          src="https://unpkg.com/@ruffle-rs/ruffle"
          onReady={() => this.load()}
          onError={() => this.createStaticLogo()}
        />
        <div ref={this.container} className={this.props.className} />
      </>
    );
  }
}
