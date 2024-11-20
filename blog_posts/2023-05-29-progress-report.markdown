---
title:  "Ruffle News - May 2023"
date:   2023-05-09 00:00:01 +00:00
author: nosamu
icon: /undraw/undraw_percentages_re_a1ao.svg
---
We have some exciting Ruffle developments to share today!

---

## Big improvements in ActionScript 3!

More fan-favorite games are finally playable again!
- [*Bloons Tower Defense 4*](https://www.kongregate.com/games/Ninjakiwi/bloons-tower-defense-4)
- [*Happy Wheels Demo*](https://www.newgrounds.com/portal/view/547504/format/flash?emulate=flash) (Note: low framerate; performance is not optimized yet)
- [*Kingdom Rush*](http://www.kongregate.com/games/Ironhidegames/kingdom-rush)
- [*Dead Zed 2*](https://www.newgrounds.com/portal/view/634358?emulate=flash)

Many graphics drawing methods have been implemented and fixed! These games are working now:
- [*VVVVVV Demo*](https://www.newgrounds.com/portal/view/524398/format/flash?emulate=flash)
- [*William and Sly 2*](https://www.newgrounds.com/portal/view/586756/format/flash?emulate=flash)
- [*Sweet Drmzzz*](https://www.newgrounds.com/portal/view/651709)
- [*Fault Line*](http://www.notdoppler.com/faultline.php) (requires the Ruffle browser extension)

<img src="/2023-05-progress-report/WilliamAndSly.png" style="max-height: 300px">
<img src="/2023-05-progress-report/BloonsTD4.png" style="max-height: 300px">
<img src="/2023-05-progress-report/KingdomRush.png" style="max-height: 300px">

XML support is progressing nicely! Thanks to the great work of [@evilpie](https://github.com/evilpie), these games have become playable in Ruffle:
- [*PaintWorld*](https://www.newgrounds.com/portal/view/607069/format/flash?emulate=flash)
- [*Army of Ages*](https://www.gameflare.com/online-game/army-of-ages/)
- [*Tilt*](https://www.newgrounds.com/portal/view/486700/format/flash?emulate=flash)
- [*Headless Zombie 2*](https://www.newgrounds.com/portal/view/651073?emulate=flash)

[@Aaron1011](https://github.com/Aaron1011/)'s work on Stage3D continues! Many of the newer Fancy Pants games are now playable:
- *The Fancy Pants Adventures: World 4* series: [Part 1](https://www.newgrounds.com/portal/view/750785), [Part 2](https://www.newgrounds.com/portal/view/752737)
- [*The Cutie Pants Adventures*](https://www.kongregate.com/games/DrNeroCF/the-cutie-pants-adventures-world-1)

Note: Because Stage3D is graphically intensive, only the Ruffle desktop app can currently run these games well.

## ActionScript 2 support is improving too!
[@Toad06](https://github.com/Toad06/) has implemented some additional XML methods, making *Mission in Snowdriftland* playable in Ruffle! You can check it out on the [Flashpoint testing site](https://ooooooooo.ooo/static/?7d01dea2-d54f-f04a-bd84-49477152fabb) (forgive the goofy URL).

<img src="/2023-05-progress-report/MissionInSnowdriftland.png" style="max-height: 350px">

## The Ruffle desktop app finally has a user inteface!
Thanks to the efforts of [@mike](https://github.com/Herschel/) and [@Dinnerbone](https://github.com/Dinnerbone/), the desktop app now has a menu bar and context menu! You can also open SWF files by dragging them into the Ruffle window.

<img src="/2023-05-progress-report/RuffleDesktopGUI.png">

## Ruffle now has a built-in save manager!
Thanks to the work of [@danielhjacobs](https://github.com/danielhjacobs/), web builds of Ruffle allow you to back up and restore your progress for any game. Just right-click => Open Save Manager!

<img src="/2023-05-progress-report/SaveManager.png">

## We're looking for help localizing Ruffle to other languages!
If you'd like to help translate Ruffle into your language, please [join our new CrowdIn project](https://crowdin.com/project/ruffle).

## Ruffle finally supports copying and pasting text!
Thanks to the efforts of [myself](https://github.com/n0samu/) and [@Toad06](https://github.com/Toad06/), editable text boxes in Ruffle now support cutting, copying and pasting. You can also press Ctrl-A to select all. Check out the demo below, where I create, copy and paste a level code in *Super Mario Flash*!

<video muted autoplay controls>
    <source src="/2023-05-progress-report/SuperMarioFlashCopyPasteDemo.mp4" type="video/mp4">
</video>

## We have more awesome things coming up!
- Tonight's Ruffle build will feature some major **desktop interface improvements** from [@Dinnerbone](https://github.com/Dinnerbone/)!

    <img src="/2023-05-progress-report/DesktopGUIAdvancedOpen.png" style="max-height: 500px">

- [@kmeisthax](https://github.com/kmeisthax/) is working on **FLV support!** Soon Ruffle will support Flash content with external video files. [You can follow his progress here](https://github.com/ruffle-rs/ruffle/pull/10756).
- [@uqers](https://github.com/Lord-McSweeney/) is working on **mixed AVM support!** This will resolve crashes in ActionScript 2 games encrypted with MochiCrypt, along with other games and applications that mix ActionScript 2 and 3. [You can follow his progress here](https://github.com/ruffle-rs/ruffle/pull/11005).
- [@Michiel](https://github.com/michiel2005) is working on a fix for unclickable buttons in many AS2 games, such as [Electricman 2](https://www.newgrounds.com/portal/view/363447) and [Super Soldier](https://www.newgrounds.com/portal/view/284305). [You can follow his progress here](https://github.com/ruffle-rs/ruffle/pull/10862).
