---
title:  "Stable Releases, API, Text... and Everything Else!"
date:   2026-10-23 21:00:00 +0100
author: Dinnerbone
icon: /undraw/undraw_turn-back-time_rspn.svg
images:
  - /2026-10-23-stable-releases-and-everything-else/club_penguin_strokes.png
  - /2026-10-23-stable-releases-and-everything-else/zombidle.png
videos:
  - /2026-10-23-stable-releases-and-everything-else/sm63.mp4
---

Well, we *said* we'd make these posts more often... it's been over two years since the last one!
We'll come up with a poor excuse for our absence at the bottom of the post, but we're hoping that all these really cool changes will distract you from that!

As always, let's summarize with some fancy numbers before we get into any of that.

Since the last blog post (over 2 years ago)...
- ActionScript 3 API has gone up from 76% to **82%**!
- ActionScript 1/2 Language has gone from 95% to **99%**!
- ActionScript 1/2 API has gone up from 78% to **82%**!
- We've merged **TODO** pull requests from **TODO** <del>people</del> users! (humans? bots? who's to say anymore!)
- We've closed **TODO** issues!
- We've added **TODO** new automated tests!
- The number of languages on [Crowdin](https://crowdin.com/project/ruffle) has gone from 25 to 37.

---

## Stable releases! Multiple of them!
A frequent request over the past few years has been to make less frequent, stable, releases - and thanks to the work of [@kjarosh](https://github.com/kjarosh) to finish up all the loose ends, we're finally there.

In fact, we're now on version 0.7.1 at the time of writing this! We've had quite a few stable releases since the first one back in May to prove out the system, so it's about time we actually announced them!

Stable releases do not have a fixed frequency, and will mainly drop when we feel that enough has changed to warrant a new version, and that we're feeling _reasonably_ confident in the stability and performance.

We'll still release nightlies for those brave souls who are willing to test things ahead of time and want to help us find and fix bugs, but we do recommend that users switch to stable releases if they, frankly, just don't want the fuss.

### Desktop App
Our desktop app does not auto update by itself, so you'll still need to manually download either the stable or nightly releases whenever you wish to update.
You can find the links on [our download page](https://ruffle.rs/downloads). For Linux users, [our Flatpak app](https://flathub.org/en/apps/rs.ruffle.Ruffle) updates automatically for stable releases. Since last year we also provide builds for Linux users on ARM64.

### Browser Extension
We've changed the official store releases of our extensions to use stable releases, nice and easy. If you want stable releases, there's nothing to do here, hurray!
If you do want to live on the bleeding edge, you'll have to [manually download](https://ruffle.rs/downloads) and install the nightly version of the extension. They do not self update, so we do not generally recommend this outside of testing.

### Web (Self-Hosted)
The self-hosted version of Ruffle is available in both stable and nightly versions on [our download page](https://ruffle.rs/downloads), as normal.

### Web (CDN/UNPKG)
If you installed Ruffle onto your website through our recommended `<script src="https://unpkg.com/@ruffle-rs/ruffle"></script>` tag, you're now using stable releases. Hurray!
If you want to stay on the bleeding edge, though, swap that to `<script src="https://unpkg.com/@ruffle-rs/ruffle@nightly"></script>` instead.

### Android App
The Android app is technically a separate project and is not affected by the stable releases. If there's demand for this, we'll look into it - but we also want help maintaining it!

## A stable JavaScript API
In early versions of Ruffle, we just started putting methods and properties on the `<ruffle-player>` element itself. Turns out, this wasn't so smart, and we ended up conflicting with the `ExternalInterface` API and Flash's own (mostly undocumented) API.

To fix this, we've added a `.ruffle()` API that we recommend using instead. This mostly means using `foo.ruffle().load()` instead of `foo.load()`, but the full API can be found on our [JS docs](https://ruffle.rs/js-docs/master/interfaces/Player.PlayerV1.html).
This API is versioned; if we ever need a v2, we can `.ruffle(2)`. The previous API still exists for compatibility, but we do not recommend its use for newer code.

## AVM1 (ActionScript 1/2)
You may have noticed that whilst our "ActionScript 1/2 Language" percentage has crept its way up to 99%... We're pretty proud of that!
Unfortunately, we're very much in the ["90/90 rule"](https://en.wikipedia.org/wiki/Ninety%E2%80%93ninety_rule) area.
> The first 90 percent of the code accounts for the first 90 percent of the development time.
> The remaining 10 percent of the code accounts for the other 90 percent of the development time.

We've made many incorrect assumptions during the early days of our AVM1 implementation which we're trying to correct now in the final 1%.
We can confidently say that almost every real world movie will work, but we're constantly finding areas that we would not match Flash, and trying to fix those is difficult.

- [@dinnerbone](https://github.com/dinnerbone) introduced an AVM1 "playerglobal", laying the groundwork for moving our built-in functions to ActionScript ([#23730](https://github.com/ruffle-rs/ruffle/pull/23730)).
- [@relrelb](https://github.com/relrelb) moved `Point` and `AsBroadcaster` from Rust to ActionScript ([#24873](https://github.com/ruffle-rs/ruffle/pull/24873), [#24736](https://github.com/ruffle-rs/ruffle/pull/24736)).
- [@moulins](https://github.com/moulins) made a bunch of built-in classes resolve dynamically ([#24327](https://github.com/ruffle-rs/ruffle/pull/24327), [#24500](https://github.com/ruffle-rs/ruffle/pull/24500), [#24656](https://github.com/ruffle-rs/ruffle/pull/24656), [#24658](https://github.com/ruffle-rs/ruffle/pull/24658), [#24696](https://github.com/ruffle-rs/ruffle/pull/24696), [#24961](https://github.com/ruffle-rs/ruffle/pull/24961)).
- [@moulins](https://github.com/moulins) migrated functions and `super` to `NativeObject`, finally killing off `TObject` ([#19936](https://github.com/ruffle-rs/ruffle/pull/19936), [#20204](https://github.com/ruffle-rs/ruffle/pull/20204)).
- [@relrelb](https://github.com/relrelb) fixed resolving variables on removed clips ([#24725](https://github.com/ruffle-rs/ruffle/pull/24725)), finally fixing the infamous Super Mario 63 bug!
- [@jarca0123](https://github.com/jarca0123) fixed the clip removal logic when rewinding, fixing bugs in Electricman 2, Ratman Ralph, Super Sub Hero and Pink Tac Toe ([#21336](https://github.com/ruffle-rs/ruffle/pull/21336)).
- [@CUB3D](https://github.com/CUB3D) fixed the base clip path of functions, fixing a bug in Champion Archer ([#20861](https://github.com/ruffle-rs/ruffle/pull/20861)).
- [@ste42](https://github.com/ste42) fixed timeline scope on target clip removing, fixing a bug in Achilles ([#20837](https://github.com/ruffle-rs/ruffle/pull/20837)).
- [@kjarosh](https://github.com/kjarosh) fixed a crash when swapping children, reported in many games such as Ben 10: Ben to the Rescue ([#19594](https://github.com/ruffle-rs/ruffle/pull/19594)).
- [@kjarosh](https://github.com/kjarosh) implemented `loadVariables` for non-movie-clip targets ([#19467](https://github.com/ruffle-rs/ruffle/pull/19467)).
- [@kjarosh](https://github.com/kjarosh) fixed a crash when removing objects ([#19462](https://github.com/ruffle-rs/ruffle/pull/19462)).
- [@Toad06](https://github.com/Toad06) fixed the unloading of button's children, fixing looping sound effects in Escaping the Prison and a regression in Pestilence Z ([#18520](https://github.com/ruffle-rs/ruffle/pull/18520)).

<video muted autoplay controls>
    <source src="/2026-10-23-stable-releases-and-everything-else/sm63.mp4" type="video/mp4">
</video>

## AVM2 (ActionScript 3)
- [@Lord-McSweeney](https://github.com/Lord-McSweeney) has made many improvements to the AVM2 performance, almost all of which also bring some bonus bug fixes:
  - Preallocate stack sizes and improved the verifier/optimizer ([#17140](https://github.com/ruffle-rs/ruffle/pull/17140)).
  - Rewrote the optimizer with proper state merging ([#19884](https://github.com/ruffle-rs/ruffle/pull/19884)).
  - Added peephole passes to the optimizer ([#20202](https://github.com/ruffle-rs/ruffle/pull/20202)).
  - Fewer allocations on method calls ([#19946](https://github.com/ruffle-rs/ruffle/pull/19946)).
  - Faster native calls (built in methods) ([#20328](https://github.com/ruffle-rs/ruffle/pull/20328)).
  - Vector indexing improvements, which fixed one version of Run 2 ([#20565](https://github.com/ruffle-rs/ruffle/pull/20565)).
  - Use stack slices for activations, speeding up stack access ([#20829](https://github.com/ruffle-rs/ruffle/pull/20829)).
  - Removed `PrimitiveObject` ([#18995](https://github.com/ruffle-rs/ruffle/pull/18995)).
  - Better trait verification, fixing a black screen in Cardinal Quest ([#17119](https://github.com/ruffle-rs/ruffle/pull/17119)).
- [@Lord-McSweeney](https://github.com/Lord-McSweeney) made `Dictionary` match Flash's "JIT mode" behaviour for `QName` keys, fixing a black screen in Typing Maniac ([#24890](https://github.com/ruffle-rs/ruffle/pull/24890)).
- [@Lord-McSweeney](https://github.com/Lord-McSweeney) fixed the serialization of `Dictionary`, fixing save games in Reactance 2 and Muse Quest ([#21428](https://github.com/ruffle-rs/ruffle/pull/21428)).
- [@Lord-McSweeney](https://github.com/Lord-McSweeney) fixed the version of some `Context3D` methods, fixing Tamagotchi Friends: Dream Town, Zombidle and Mutant Fighting Cup 2 ([#22077](https://github.com/ruffle-rs/ruffle/pull/22077)).
- [@evilpie](https://github.com/evilpie) implemented the missing `RegExp` features, fixing Castle Wars 2 ([#20426](https://github.com/ruffle-rs/ruffle/pull/20426)).
- [@adrian17](https://github.com/adrian17) made `ByteArray.compress` more accurate to how Flash compresses things, fixing progress not being saved in GemCraft Labyrinth ([#18366](https://github.com/ruffle-rs/ruffle/pull/18366)).
- [@uaua](https://github.com/uaua) made hover events dispatch whilst dragging ([#21661](https://github.com/ruffle-rs/ruffle/pull/21661)).
- [@atirna](https://github.com/atirna) made mouse events be clipped to an object's `scrollRect`, fixing the inventory cursor in The Enchanted Cave 2 ([#24475](https://github.com/ruffle-rs/ruffle/pull/24475)).
- [@SuchAFuriousDeath](https://github.com/SuchAFuriousDeath) fixed a crash in `Array.splice`, which fixed Dynapuff Jump ([#23197](https://github.com/ruffle-rs/ruffle/pull/23197)).
- [@AllinolCP](https://github.com/AllinolCP) made `URLRequest` with an empty body perform a `GET`, matching Flash ([#20242](https://github.com/ruffle-rs/ruffle/pull/20242)).
- [@adrian17](https://github.com/adrian17) fixed a crash with using null ratios in `Graphics`'s gradient APIs ([#18699](https://github.com/ruffle-rs/ruffle/pull/18699)).

<a href="/2026-10-23-stable-releases-and-everything-else/typing_maniac.png" target="_blank"><img src="/2026-10-23-stable-releases-and-everything-else/typing_maniac.png" title="A screenshot of Typing Maniac" alt="A screenshot of Typing Maniac" style="max-height: 300px"></a>
<a href="/2026-10-23-stable-releases-and-everything-else/zombidle.png" target="_blank"><img src="/2026-10-23-stable-releases-and-everything-else/zombidle.png" title="A screenshot of Zombidle" alt="A screenshot of Zombidle" style="max-height: 300px"></a>

## Text Fields & Fonts
A frequent topic on these blog posts, it turns out that _text rendering is hard_... Who knew!

- [@kjarosh](https://github.com/kjarosh) has put an incredible amount of work into improving our font rendering; both in terms of correctness and performance:
  - Implemented AVM2 `TextField.styleSheet` (CSS-like) support, as used by Transformice and Dead Maze ([#19143](https://github.com/ruffle-rs/ruffle/pull/19143)).
  - Fixed text layout measurements ([#18332](https://github.com/ruffle-rs/ruffle/pull/18332)).
  - Fixed text alignment for autosize fields, fixing misaligned numbers in Nanaca Crash ([#18494](https://github.com/ruffle-rs/ruffle/pull/18494)).
  - Improved the performance of rendering fonts by measuring them less ([#23862](https://github.com/ruffle-rs/ruffle/pull/23862)).
  - Made autosize bounds calculate lazily ([#18870](https://github.com/ruffle-rs/ruffle/pull/18870)).
  - Implemented glyph fallback for device fonts, matching Flash Player ([#20639](https://github.com/ruffle-rs/ruffle/pull/20639)).
  - Added support for device font rendering on the web via an offscreen canvas ([#22254](https://github.com/ruffle-rs/ruffle/pull/22254)).
  - Added a FreeType device font renderer on desktop, using the OS to rasterize glyphs (Linux for now) ([#24418](https://github.com/ruffle-rs/ruffle/pull/24418)).
  - Fixed rendering device fonts with small shears ([#22684](https://github.com/ruffle-rs/ruffle/pull/22684)).
  - Improved the x/y scaling of device fonts ([#22209](https://github.com/ruffle-rs/ruffle/pull/22209)).
  - Implemented the `TextField` AVM2 scroll event ([#24625](https://github.com/ruffle-rs/ruffle/pull/24625)).
- [@cmdocmd](https://github.com/cmdocmd) added HTML `<img>` tag parsing/serialization ([#24802](https://github.com/ruffle-rs/ruffle/pull/24802)).
- [@wsxarcher](https://github.com/wsxarcher) made it possible to load ttf/otf/ttc/otc files as default fonts in the extension ([#17668](https://github.com/ruffle-rs/ruffle/pull/17668)).

## Audio & Video
- [@torokati44](https://github.com/torokati44) added AAC audio decoding ([#16526](https://github.com/ruffle-rs/ruffle/pull/16526)).
- [@torokati44](https://github.com/torokati44) added H.264 decoding on web using the WebCodecs API ([#16794](https://github.com/ruffle-rs/ruffle/pull/16794)).
- [@Toad06](https://github.com/Toad06) made sure sounds get stopped on children of unloaded movies, fixing a music regression in Super Mario Bros Z ([#18516](https://github.com/ruffle-rs/ruffle/pull/18516)).
- [@kennylerma](https://github.com/kennylerma) made `SoundTransform` apply before playback ([#22154](https://github.com/ruffle-rs/ruffle/pull/22154)).
- [@ChrisCPI](https://github.com/ChrisCPI) improved the behaviour of AVM1's `Sound.loadSound()` ([#23975](https://github.com/ruffle-rs/ruffle/pull/23975)).
- [@1bugproof](https://github.com/1bugproof) made `new Video(0, 0)` use the default video size, matching Flash ([#23708](https://github.com/ruffle-rs/ruffle/pull/23708)).

## Rendering Improvements
- [@ChrisCPI](https://github.com/ChrisCPI) added JPEG XR image loading ([#23789](https://github.com/ruffle-rs/ruffle/pull/23789)).
- [@darktohka](https://github.com/darktohka) improved hairline and scaling strokes on WebGL and WGPU, fixing the infamous "thick lines" issues in almost every game or movie ([#23011](https://github.com/ruffle-rs/ruffle/pull/23011)).
- [@kjarosh](https://github.com/kjarosh) added support for transparency in masks, fixing rendering in Typographist and Tim Credible ([#21497](https://github.com/ruffle-rs/ruffle/pull/21497)).
- [@dinnerbone](https://github.com/dinnerbone) has started rewriting the wgpu backend for performance ([#24947](https://github.com/ruffle-rs/ruffle/pull/24947)).
- [@kjarosh](https://github.com/kjarosh) fixed using masks in `BitmapData.draw`, fixing rendering in Fireboy & Watergirl 2 and 3 ([#21624](https://github.com/ruffle-rs/ruffle/pull/21624)).
- [@Aaron1011](https://github.com/Aaron1011) implemented `surfaceSelector` in `Context3D.setRenderToTexture` ([#15495](https://github.com/ruffle-rs/ruffle/pull/15495)).
- [@SuchAFuriousDeath](https://github.com/SuchAFuriousDeath) implemented `Context3D.setStencilReferenceValue` & `Context3D.setStencilActions` ([#20875](https://github.com/ruffle-rs/ruffle/pull/20875)).
- [@cookie-s](https://github.com/cookie-s) partially implemented `Matrix3D` ([#18888](https://github.com/ruffle-rs/ruffle/pull/18888)).
- [@1bugproof](https://github.com/1bugproof) fixed `copyPixels` degrading opaque pixels, which made it impossible to progress past level 4 of Toxic 2 ([#24492](https://github.com/ruffle-rs/ruffle/pull/24492)).
- [@n-raine](https://github.com/n-raine) fixed a crash with out-of-bounds pixel copying (notably in Earn to Die and Earn to Die 2: Exodus) ([#23898](https://github.com/ruffle-rs/ruffle/pull/23898)).
- [@Bubby4j](https://github.com/Bubby4j) fixed an OOM by flushing GPU work periodically during cache processing ([#23175](https://github.com/ruffle-rs/ruffle/pull/23175)).
- [@crumblingstatue](https://github.com/crumblingstatue) fixed a crash when doing a `colorTransform` out of bounds, as seen in Mega Mash ([#20363](https://github.com/ruffle-rs/ruffle/pull/20363)).
- [@kjarosh](https://github.com/kjarosh) made sure we flushed any draws before updating bitmap textures, fixing overlapping text in Robot Wants Kitty ([#19066](https://github.com/ruffle-rs/ruffle/pull/19066)).

<a href="/2026-10-23-stable-releases-and-everything-else/club_penguin_strokes.png" target="_blank"><img src="/2026-10-23-stable-releases-and-everything-else/club_penguin_strokes.png" title="Club Penguin before/after" alt="Club Penguin before/after" style="max-height: 300px"></a>

## Desktop Application
- [@kjarosh](https://github.com/kjarosh) added the ability to export the currently playing content as a Ruffle Bundle ([#21994](https://github.com/ruffle-rs/ruffle/pull/21994)).
- [@kjarosh](https://github.com/kjarosh) added basic IME support on desktop, which is currently disabled by default pending further improvements ([#19666](https://github.com/ruffle-rs/ruffle/pull/19666)).
- [@kjarosh](https://github.com/kjarosh) enabled LTO for releases ([#23863](https://github.com/ruffle-rs/ruffle/pull/23863)).
- [@kjarosh](https://github.com/kjarosh) added gamemode support on Linux ([#17940](https://github.com/ruffle-rs/ruffle/pull/17940)).
- [@kjarosh](https://github.com/kjarosh) added a workaround for RTL scripts in UI ([#20265](https://github.com/ruffle-rs/ruffle/pull/20265)).
- [@kjarosh](https://github.com/kjarosh) fixed missing characters in many languages (e.g. Japanese) ([#20263](https://github.com/ruffle-rs/ruffle/pull/20263)).
- [@kjarosh](https://github.com/kjarosh) coalesced mouse move events on desktop for performance, fixing freezes in Club Penguin's Puffle Rescue ([#24881](https://github.com/ruffle-rs/ruffle/pull/24881)).
- [@SuchAFuriousDeath](https://github.com/SuchAFuriousDeath) fixed a crash when saving files on macOS ([#22776](https://github.com/ruffle-rs/ruffle/pull/22776)).

<a href="/2026-10-23-stable-releases-and-everything-else/bundle.png" target="_blank"><img src="/2026-10-23-stable-releases-and-everything-else/bundle.png" title="Export Bundle dialog" alt="Export Bundle dialog" style="max-height: 300px"></a>

## Web & Extension
- [@robinmiau](https://github.com/robinmiau) added a "background tick mode" so content keeps running in hidden tabs ([#23395](https://github.com/ruffle-rs/ruffle/pull/23395)).
- [@robinmiau](https://github.com/robinmiau) improved the context menu behaviour and styling ([#23535](https://github.com/ruffle-rs/ruffle/pull/23535)).
- [@evilpie](https://github.com/evilpie) added support for mapping gamepad input on the web ([#18083](https://github.com/ruffle-rs/ruffle/pull/18083)).
- [@kjarosh](https://github.com/kjarosh) added RTL support for context menus ([#19950](https://github.com/ruffle-rs/ruffle/pull/19950), [#19943](https://github.com/ruffle-rs/ruffle/pull/19943)).
- [@danielhjacobs](https://github.com/danielhjacobs) removed script injection on all browsers except old Firefox ([#20255](https://github.com/ruffle-rs/ruffle/pull/20255)).
- [@kjarosh](https://github.com/kjarosh) fixed CORS issues with content trying to download from `fpdownload.adobe.com` ([#22168](https://github.com/ruffle-rs/ruffle/pull/22168)).
- [@kjarosh](https://github.com/kjarosh) added URL rewriting to help preserve content that relies on broken or outdated links ([#18252](https://github.com/ruffle-rs/ruffle/pull/18252)).

## General Bug Fixes
- [@Lord-McSweeney](https://github.com/Lord-McSweeney) allowed running AVM2 SWFs with SWF versions 8 and below ([#21055](https://github.com/ruffle-rs/ruffle/pull/21055)).
- [@Lord-McSweeney](https://github.com/Lord-McSweeney) fixed a crash with SWF v8 code moving `AVM1Movie`s around, fixing SpongeBob Decorating Dilemma freezing on its loading screen ([#21528](https://github.com/ruffle-rs/ruffle/pull/21528)).
- [@Lord-McSweeney](https://github.com/Lord-McSweeney) fixed a crash with AVM1 movies loaded by AVM2 trying to overwrite themselves, fixing crashes in many games such as Bloons Super Monkey 2 and the Sara's Cooking Class series ([#19761](https://github.com/ruffle-rs/ruffle/pull/19761)).
- [@Lord-McSweeney](https://github.com/Lord-McSweeney) made root MovieClips register as a character, fixing many games, such as Mister Rain ([#21514](https://github.com/ruffle-rs/ruffle/pull/21514)).
- [@nivkner](https://github.com/nivkner) fixed the ordering of running frame scripts, fixing a bug with Flight ([#19941](https://github.com/ruffle-rs/ruffle/pull/19941)).
- [@nivkner](https://github.com/nivkner) made queued `goto` actions overwrite prior `goto`s, fixing a bug with Epic Battle Fantasy 4 ([#20254](https://github.com/ruffle-rs/ruffle/pull/20254)).
- [@nivkner](https://github.com/nivkner) made frame scripts refresh registration, fixing a bug with Snail Bob ([#20293](https://github.com/ruffle-rs/ruffle/pull/20293)).
- [@Lord-McSweeney](https://github.com/Lord-McSweeney) fixed a queued `goto` bug with SWF9 ([#22408](https://github.com/ruffle-rs/ruffle/pull/22408)).
- [@Lord-McSweeney](https://github.com/Lord-McSweeney) fixed queued `play`/`stop` actions whilst queueing `goto`s, fixing Gacha World, Tomb Chess and William and Sly ([#24684](https://github.com/ruffle-rs/ruffle/pull/24684)).
- [@lsaa](https://github.com/lsaa) fixed invalid `gotoAndStop`s in SWF 9 & SWF 10, fixing the medal graphics in Super Crazy Guitar Maniac Deluxe 2 ([#24741](https://github.com/ruffle-rs/ruffle/pull/24741)).
- [@dinnerbone](https://github.com/dinnerbone) fixed an `ImportAssets` bug by pausing preloading until imports finish ([#16968](https://github.com/ruffle-rs/ruffle/pull/16968)).
- [@moulins](https://github.com/moulins) fixed an `ImportAssets` bug with executing `DoInitAction` code with the proper context, fixing Cubis 2 ([#21944](https://github.com/ruffle-rs/ruffle/pull/21944)).
- [@cookie-s](https://github.com/cookie-s) fixed `hitTest` on the edges of shapes, fixing characters falling through floors in Castle Cat and Powerfox ([#20811](https://github.com/ruffle-rs/ruffle/pull/20811)).
- [@masterwebx](https://github.com/masterwebx) fixed `BitmapData.hitTest` with `0` alpha threshold, fixing collision issues in Super Smash Flash 2 ([#23870](https://github.com/ruffle-rs/ruffle/pull/23870)).
- [@kjarosh](https://github.com/kjarosh) unified key input across all platforms, moving Flash-specific behaviour into core and simplifying the frontends ([#19616](https://github.com/ruffle-rs/ruffle/pull/19616)).
- [@kjarosh](https://github.com/kjarosh) fixed a bug when placing an object at an already occupied depth ([#20749](https://github.com/ruffle-rs/ruffle/pull/20749)).
- [@CUB3D](https://github.com/CUB3D) fixed many crashes with `SharedObject` ([#18046](https://github.com/ruffle-rs/ruffle/pull/18046)).
- [@kjarosh](https://github.com/kjarosh) fixed a crash loading LZMA-compressed SWFs with incorrect lengths, fixing Sherwood Dungeon not loading ([#24487](https://github.com/ruffle-rs/ruffle/pull/24487)).
- [@Bale001](https://github.com/Bale001) allowed playing of frames beyond what the SWF header defined ([#21526](https://github.com/ruffle-rs/ruffle/pull/21526)).

<a href="/2026-10-23-stable-releases-and-everything-else/ebf4.png" target="_blank"><img src="/2026-10-23-stable-releases-and-everything-else/ebf4.png" title="Epic Battle Fantasy 4" alt="Epic Battle Fantasy 4" style="max-height: 300px"></a>

## Test Framework
We're extremely proud of our tests in Ruffle, with over 500 unit tests and over 4500 conformance tests (often consisting of dozens or hundreds of smaller tests). That's a 60% increase in tests since our last blog post!
We're firm believers that any investment into test frameworks will always be worth it and pay off, and in a world where more people are throwing automation at problems, tests help keep the slop at bay.

Since the last blog post, we've had over 170 PRs aimed directly at our tests, excluding all the regular PRs that happen to include tests.
Here are some notable improvements:

- [@kjarosh](https://github.com/kjarosh) added test coverage reports to CI ([#21342](https://github.com/ruffle-rs/ruffle/pull/21342)).
- [@kjarosh](https://github.com/kjarosh) added fuzzing tests ([#23921](https://github.com/ruffle-rs/ruffle/pull/23921)).
- [@dinnerbone](https://github.com/dinnerbone) added the ability to automatically compile AVM1 tests with [Rascal](https://github.com/Dinnerbone/Rascal/) ([#23513](https://github.com/ruffle-rs/ruffle/pull/23513)).
- [@kjarosh](https://github.com/kjarosh) added the ability to automatically compile AVM2 tests with ASC ([#23794](https://github.com/ruffle-rs/ruffle/pull/23794)).
- [@dinnerbone](https://github.com/dinnerbone) added many tests and fixed many bugs in AVM1 `BitmapData` ([#22149](https://github.com/ruffle-rs/ruffle/pull/22149)).
- [@dinnerbone](https://github.com/dinnerbone) ported over a bunch of tests from [Gnash](https://www.gnu.org/software/gnash/) ([#21932](https://github.com/ruffle-rs/ruffle/pull/21932), [#21997](https://github.com/ruffle-rs/ruffle/pull/21997), [#21963](https://github.com/ruffle-rs/ruffle/pull/21963), [#21964](https://github.com/ruffle-rs/ruffle/pull/21964), [#22050](https://github.com/ruffle-rs/ruffle/pull/22050)).
- [@moulins](https://github.com/moulins) added multi-configuration support for tests ([#22093](https://github.com/ruffle-rs/ruffle/pull/22093)).

## Where have the blog posts been?
Okay, I'll drop the royal "we" and take responsibility here. I kept pushing off a blog post because of time, energy, and fatigue.
I've been working on Ruffle for 7 years now. I love this project, I'm extremely proud of everything we've accomplished,
but it's hard for me to stay dedicated for that long. I've gone through my share of burnout, it sucks, and so whenever I feel myself getting close
I take a step back and treat myself to a long break. I've taken a fair few breaks since the last blog post, and other amazing contributors and maintainers have stepped up to keep things running,
but the blog post kept waiting for me to come back and finish. Every time I thought about it, it was a bigger and more daunting task, and it became something of a vicious cycle - putting off the scary thing because it's been put off and made scarier. A tale as old as humanity!

_I already anticipate some "Why not let AI write it for you?" in some discord thread or comment section, so I will address that up-front:
Frankly, I'm no friend of LLMs. I especially do not believe it has a place writing articles and blog posts.
If you wanted just the facts, ask your friendly local LLM to do that - it might even be correct.
If you want what we, the maintainers, think and feel - you need a human to write that._

## It's 2026, are we AI yet?
This isn't a section I anticipated writing when I wrote the last blog post, but the future sure is weird.

The rise of LLMs has certainly been a thing, and I'm _sure_ you don't need yet another blog post prophesying doom or raining blind praise.
However, I do think it's fair to talk about how LLMs have affected us as a project, especially with the "decompile everything" trend that is happening.

Being completely honest - it's not great, but it's not the end of the world either. We've had some genuinely useful and helpful contributions aided by LLMs,
and I do believe that at some tasks, it is becoming _okay_, with the right guidance and someone to shepherd it and take responsibility for its actions.
However, with every useful change we get a dozen not-so-useful ones, and with a project that values correctness above all else, it's extremely hard to trust a tool
that hallucinates behaviours.

We have largely adopted [the LLVM AI Tool Use Policy](https://llvm.org/docs/AIToolPolicy.html) ([with a few project-specific rules](https://github.com/ruffle-rs/ruffle/blob/master/CONTRIBUTING.md#ai-tool-use-policy)), which mostly boils down to "a human must be in the loop".
For the correctness of our project, for the quality of our code, and for the sanity of our maintainers - we need people to be able to understand, and take responsibility for, the output of their tools.
It's hard to imagine projects thriving where that isn't true.

It's worth noting that our PR backlog is _long_, and it rises every day. It's very easy to create a dozen pull requests, but each one requires _more_ effort and time from our maintainers than it did for someone to create them.
Maintainer burnout is real, and it's becoming a serious problem. It's not solely due to LLMs, of course, but it's certainly the biggest factor as of writing this post.
This is a problem that affects the entire open source community as a whole, not just Ruffle, and there's no solution in sight. Be kind to your local OSS maintainers :)

## Thank you all!
I'm so very proud of how far we've got with Ruffle, and I know that it only gets better from here. Thank you to everybody who helped keep Ruffle alive throughout these crazy times, and see you in the next post!

As a reminder, Ruffle is a completely open source project and we're always looking for contributions! Some quick ways to help out:
- Speak another language? [Help translate Ruffle](https://crowdin.com/project/ruffle) to your native language over on Crowdin.
- Got a few bucks to spare? [Sponsor the project](https://opencollective.com/ruffle) and help us fund future development.
- Like playing games? Try Ruffle on your favourite content and [report any issues](https://github.com/ruffle-rs/ruffle/issues) you find!
- Can you code? Whip out your favourite IDE and [help us improve](https://github.com/ruffle-rs/ruffle/blob/master/CONTRIBUTING.md) - the player is in Rust, everything web is TypeScript, and the Android app is Kotlin.
- Got a friend? Tell them to help out! :D

Thank you all again, and see you in the next blog post!
<3
