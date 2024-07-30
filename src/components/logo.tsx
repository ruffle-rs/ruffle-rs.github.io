"use client";

import React from "react";
import Image from "next/image";
import Script from "next/script";
import classes from "../app/index.module.css";

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

interface LogoState {
  player: RufflePlayer | null;
}

export default class InteractiveLogo extends React.Component<
  LogoProps,
  LogoState
> {
  private readonly container: React.RefObject<HTMLDivElement>;
  private player: RufflePlayer | null = null;

  constructor(props: LogoProps) {
    super(props);

    this.container = React.createRef();
    this.state = {
      player: null,
    };
  }

  private removeRufflePlayer() {
    this.player?.remove();
    this.player = null;
    this.setState({ player: null });
  }

  private load() {
    if (this.player) {
      // Already loaded.
      return;
    }

    this.player = (window.RufflePlayer as PublicAPI)?.newest()?.createPlayer();

    if (this.player) {
      this.container.current!.appendChild(this.player);

      this.player
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
          this.removeRufflePlayer();
        });
      this.player.style.width = "100%";
      this.player.style.height = "100%";
      this.setState({ player: this.player });
    }
  }

  componentDidMount() {
    this.load();
  }

  componentWillUnmount() {
    this.removeRufflePlayer();
  }

  render() {
    return (
      <>
        <Script
          src="https://unpkg.com/@ruffle-rs/ruffle"
          onReady={() => this.load()}
        />
        <div ref={this.container} className={this.props.className}>
          <Image
            src="/logo.svg"
            alt="Ruffle Logo"
            className={this.state.player ? classes.hidden : classes.staticLogo}
            width="340"
            height="110"
          />
        </div>
      </>
    );
  }
}
