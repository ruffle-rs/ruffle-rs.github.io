---
title:  "Optimisations, Text Input, Tab Focusing and More!"
date:   2024-09-12 21:02:00 +0100
author: Dinnerbone
icon: /undraw/undraw_setup_analytics_re_foim.svg
images:
  - /2024-09-12-optimisations-text-more/club-penguin.png
---
We really should start making these posts more often, because phew there's a lot that happened in the last 7 months!
There's *so many* improvements to Ruffle, that we really can't do it justice with an easy summary here. This blog post is going to be a little long, but the highlights are at the top!

As before, let's summarize with some fancy numbers first.

Since the last blog post (8 months ago)...
- ActionScript 3 Language has gone up from 75% to **XXXXX%**!
- ActionScript 3 API has gone up from 68% to **XXXXX%**!
- ActionScript 1/2 Language has remained at 95%. We're fairly sure we're feature complete, just some pesky bugs left! 
- ActionScript 1/2 API has gone up from 75% to **XXXXX%**!
- We've merged **xxxxxxxx** pull requests from **xxxxxxxxxxx** people! (And xxxxxxxxxxx bots.)
- We've closed **xxxxxxxxx** issues (and some of them were real issues! Crazy!)
- We've added **xxxxx** new automated tests!

---

## Preparing for a stable release
Ruffle has been "version 0.1.0" since the [initial commit](https://github.com/ruffle-rs/ruffle/commit/b979ac26a9dad77ca66c3f9171efac4acfa8c19d) over 8 years ago! Suffice it to say, we've come a long, long way since then and we think it's about time we recognise that we're no longer an experimental piece of software, but a legitimate library that's already used by many huge websites - including the Wayback Machine!

@kjarosh and @dinnerbone have been working on preparing things for our very first Stable release, and we'll soon have a plan to perform them regularly after that. With stable releases, we'll also (try to) make more regular blog posts and provide a stable API to all projects that use Ruffle.

Leading up to the stable release, we've also started packaging Ruffle's Desktop Application a little bit better:
- @dinnerbone has created an installer for Windows, which includes associating Ruffle with Flash files. No auto-updater yet though, sorry!
- @Doomsdayrs and @kjarosh have made Ruffle available via [Flatpak](https://flathub.org/apps/rs.ruffle.Ruffle) for easy installation on Linux with automatic updates.

## Text Fields & Fonts
Text inputs are one of those things that you never really think about until you encounter one that just doesn't *feel right*. Until recently, Ruffle's text input was a terrible example of this; shortcuts barely worked, you couldn't highlight text, scrolling was unlikely and it was just generally *wonky*.

The amazing @kjarosh has been working hard on fixing this, making text inputs closer to Flash and feel just oh so much better. All the way from better rendering to keyboard shortcuts and relevant context menus - they should just work the way you expect in most cases now! And yes, thankfully, this includes selecting text with a mouse - a feature we all take for granted until it doesn't exist.

<video muted autoplay controls>
    <source src="/2024-09-12-optimisations-text-more/text-selection.mp4" type="video/mp4">
</video>

Similarly, @evilpie and @dinnerbone have further improved font rendering in some cases - such as default Japanese fonts, better kerning, and support for DefineFont4 (a compressed font format that Flash used with its Text Layout Framework). There's likely still issues left to be discovered, but we're pretty happy with where we are today!


## Tab Focusing
Thanks to a lot of work (and perhaps sleepless nights) by @kjarosh, Ruffle not only has tab focus support now - but it should fairly accurately match Flash's. You can follow the series of changes that were needed for this [over on Github](https://github.com/ruffle-rs/ruffle/issues/5443#issuecomment-1992075171), which involved practically every area of the codebase to make this feel and function the same as Flash Player.

This came with a lot of other smaller improvements too; there's a focus rectangle around objects, many ActionScript events are more correctly implemented, and navigating objects using the arrow keys should work just fine too.

This is another one of those areas that just felt annoying when it doesn't work, but you'd likely never think twice about it when it does!

## Optimisations
The priority for Ruffle has always been correctness above all else. We implement something, get it right, *make tests*, and then look at how to speed it up. Until recently, we've been firmly in the "get things working" stage. Well, if you look at our progress percentage above - I think you'll see that quite a lot of things work the way they're supposed to these days! That means it's time to visit all the pain points for performance, and oh boy there's been some huge improvements in this area.

@Lord-McSweeney and @adrian17 have implemented a verifier for AVM2, which lets us safely make assumptions about code and optimise based on those. This has unlocked adding an optimiser pass, which greatly speeds up ActionScript 3 content and removes a lot of overhead.
It's still far from Flash Player speeds, but they have a JIT and had decades to make everything as fast as it was. We're getting there, though!

Some other notable optimisations:
- @adrian17 has implemented dependent strings and extended our use of interned strings, reducing the amount of memory needed for string operations in ActionScript and speeding up lots of basic text processing.
- @adrian17 has also improved caching in Stage3D content, giving us up to 4x the FPS on some content that uses it.
- @dinnerbone has optimised general rendering slightly, reducing the number of times we submit buffers to the GPU per frame.
- @kjarosh has improved the speed of some rounding functions by about 20%. These functions are used all over the codebase all the time.
- @moulins has been working on improvements to how Ruffle uses [gc-arena](https://github.com/kyren/gc-arena), which reduces a lot of general overhead to anything that can be garbage collected.
- @Lord-McSweeney has been refactoring our implementation of an ActionScript 3 `class`, simplifying a lot of code and allowing for even more performance improvements.

## Desktop Application
The desktop application has received a lot of love this year! @dinnerbone has added persistent storage of preferences, which lets you do stuff like changing the rendering backend without needing to use the command line every time you start Ruffle.
Building on top of this, @sleepycatcoding has added bookmarks and a "recents" menu, giving much needed quality of life to using Ruffle to play content.
We've also made Ruffle save a log file by default, which helps with debugging when something goes wrong.

<a href="/2024-09-12-optimisations-text-more/bookmarks.png" target="_blank"><img src="/2024-09-12-optimisations-text-more/bookmarks.png" title="A bookmarks menu in Ruffle" alt="A bookmarks menu in Ruffle" style="max-height: 300px"></a>
<a href="/2024-09-12-optimisations-text-more/preferences.png" target="_blank"><img src="/2024-09-12-optimisations-text-more/preferences.png" title="A preferences menu in Ruffle" alt="A preferences menu in Ruffle" style="max-height: 300px"></a>


We've also introduced a new file format that our desktop application (and soon Android application) supports, called a "Ruffle Bundle". This is a way to package up games and movies that require specific settings to work, or contain so many files that need to be placed in a certain file structure.
Details about this format can be found [in our documentation](https://github.com/ruffle-rs/ruffle/blob/master/frontend-utils/src/bundle/README.md), and we're likely to evolve this format over time. One idea we have is to add controller mappings and touchscreen widgets to the bundle - so that games can be brought over to new platforms without requiring a keyboard and mouse. 

Some other notable changes to desktop:
- @evilpie has improved spoofing for content that uses ExternalInterface, allowing you to play more content locally that is normally restricted to specific websites.
- @Aaron1011, @kjarosh, @sleepycatcoding and @crumblingstatue have all improved our Debug UI, making it more powerful with features like editing AVM1 properties live, seeing AVM2 Domains, and the focus order of every object.
- @torokati44 has added support for H.264 FLV video playback, using Cisco's [OpenH264](https://www.openh264.org/). This downloads the library at runtime to comply with openh264's license, and can be disabled in the Preferences menu.
- @kjarosh has added the View menu, allowing you to change some settings on the fly (such as the scale mode).

<video muted autoplay controls>
    <source src="/2024-09-12-optimisations-text-more/edit-avm1-value.mp4" type="video/mp4">
</video>

## Android Application
For a while now, @torokati44 has been maintaining an unofficial Android application for Ruffle, which was pretty barebones but was already quite popular despite not being released anywhere. We've decided to bring it under the Ruffle umbrella and have officially adopted it as our Android application.
@dinnerbone has overhauled the codebase and UI for it, giving it support for most Flash content - even online games like Transformice work!
However, it's still too early for us to feel comfortable publishing it to the Play Store, as there's a lot of UX that needs improving. Help is very much appreciated from any Android developers!

We've seen that there's already a bunch of apps out there which package Ruffle, and that's pretty cool! However, they seem to all use the web version of Ruffle, which leaves a lot of performance on the table. We're hoping that by using the native codebase, we'll end up with really decent performance and stability... finally putting Flash back on mobile phones after all this time!
*(perhaps iOS too, now that they've relaxed their rules about emulators... but we'd need an iOS developer to champion that!)*

## Browser Extension
There's been a lot of improvements to the extension codebase, and some bug fixes here and there. The major points here though are:

- @danielhjacobs has upgraded us fully to Manifest V3 on Firefox, with a new Onboarding screen for permission requests.
- @danielhjacobs has also brought back "SWF takeover" (loading a SWF url directly, and have it play in Ruffle instead of downloading) using the upcoming header detection feature of `declarativeNetRequest` in Manifest V3. This API only works in latest Chromium currently.
- @riku-42 has added support for 4399.com (a Chinese flash game site) with our extension by adding better Flash detection workarounds.

## Web Improvements
There has also been a lot of improvements under the hood here for code quality, and especially preparation for releasing a stable version. There's a few notable highlights though:

- Thanks to contributions from @WumboSpasm, the general look and feel of the UI on web is much improved. This includes support for dark mode, which will match the browsers settings.
- @dinnerbone has been working on stabilizing our JavaScript API, and also making a `ruffle-core` package that anyone can use as an npm dependency, instead of relying on our prebuilt zip packages. This work is ongoing but should be completed soon!
- @dinnerbone has improved `ExternalInterface` support, allowing support for games like Club Penguin which interacted with the page heavily.

## Rendering Improvements
@Aaron1011 has fixed a bunch of bugs relating to Stage3D, and improved PixelBender support.

@moulins has found and fixed lots of smaller issues with our implementation of filter effects, and provided better tests for them.

@kjarosh, @Aaron1011 and @adrian17 have improved the ActionScript `Graphics` API, making content that used it look more correct.


## Other improvements
There have been *so many* changes from so many people, it's hard to list them all. Here's a few notable changes that are worth mentioning but are too hard to categorise:
- @sleepycatcoding, @evilpie, @dinnerbone, @adrian17 and @Aaron1011 have all improved the AVM2 XML API to some degree - we can now handle most advanced uses, which significantly improves support of games that use it.
- @kjarosh has implemented support for right-clicking and middle-clicking in content, implemented mouse wheel events, and improved double-click and triple-click support (especially with text selection)
- @Lord-McSweeney has implemented "Loader reuse", which unblocked many online/MMO games which relied on this.
- @dinnerbone has implemented `LocalConnection` support, which makes Club Penguin work in Ruffle.
- @evilpie has implemented File Selection APIs used by Scratch, allowing you to download and upload files in content that uses it.

... and so so so many bug fixes and miscellaneous improvements!

<a href="/2024-09-12-optimisations-text-more/club-penguin.png" target="_blank"><img src="/2024-09-12-optimisations-text-more/club-penguin.png" title="Club Penguin running in Ruffle" alt="Club Penguin running in Ruffle" style="max-height: 300px"></a>


## Thank you all!
It's been a crazy few months, and I'm so proud of all the progress we keep making. We couldn't have done it without the entire Ruffle community though - so thank you for everyone who helped out.

As a reminder, Ruffle is a completely open source project and we're always looking for contributions! Some quick ways to help out:
- Speak another language? [Help translate Ruffle](https://crowdin.com/project/ruffle) to your native language over on Crowdin
- Got a few bucks to spare? [Sponsor the project](https://opencollective.com/ruffle) and help us fund future development
- Like playing games? Try Ruffle on your favourite content and [report any issues](https://github.com/ruffle-rs/ruffle/issues) you find - or maybe check out [the latest annual Flash Forward Jam](https://www.newgrounds.com/bbs/topic/1532035) on Newgrounds!
- Can you code? Whip out your favourite IDE and [help us improve](https://github.com/ruffle-rs/ruffle/blob/master/CONTRIBUTING.md) - the player is in Rust, everything web is Typescript, and the android app is Kotlin
- Got a friend? Tell them to help out! :D

Thank you all again, and see you in the next blog post!
<3
