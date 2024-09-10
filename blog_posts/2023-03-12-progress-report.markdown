---
title:  "First post, progress report!"
date:   2023-03-12 01:23:00 +0100
author: nosamu
icon: /undraw/undraw_welcoming_re_x0qo.svg
---
Get ready for the biggest Ruffle announcement yet! And the first one on the blog!

---

## Huge improvements to Ruffle's AVM1 engine accuracy!
Thanks to a massive code refactor by [@CUB3D](https://github.com/CUB3D/), dozens upon dozens of ActionScript 2 games have been fixed! Here are just a few of them:
- [Chibi Knight](https://www.newgrounds.com/portal/view/526470)
- [Xeno Tactic 2](https://www.newgrounds.com/portal/view/438241/format/flash?emulate=flash)
- [Trojan War](https://www.newgrounds.com/portal/view/604949/format/flash?emulate=flash)
- [Frontline Defense](https://www.kongregate.com/games/kazama_bee/frontline-defense-first-assault)
- [Bubble Bobble: The Revival](https://flasharch.com/en/archive/play/084db17094dc7452f01da0905d7eb516)
- [Cube Colossus](https://www.newgrounds.com/portal/view/507205/format/flash?emulate=flash)
- [Chronotron](https://www.kongregate.com/games/Scarybug/chronotron)
- [The Powerpuff Girls: Attack of the Puppybots](https://flasharch.com/en/archive/play/b93354279e9788b849f83ef78f52cbbb)
- [Extreme Pamplona](https://flasharch.com/en/archive/play/e36aac73914ec8672218317e000615d7)

## Incredible progress in AVM2 (ActionScript 3) support!
- Our website now has [a page listing exactly what ActionScript 3 APIs we have implemented](https://ruffle.rs/compatibility/avm2), making it easy to follow our progress. It will be frequently updated!
- XML support is rapidly improving! ActionScript 3 games tend to use a wide variety of XML methods. As Ruffle gains support for these methods, games are springing to life!
- Several problems that caused unresponsive buttons and menus have been fixed. Unclickable buttons in ActionScript 3 games are (mostly) a thing of the past!
- Other major refactors are in progress to improve Ruffle's compatibility with ActionScript 3 frameworks like Haxe.
- [@Aaron1011](https://github.com/Aaron1011/) is working on **Stage3D support**! Thanks to his work, the gorgeous interstellar strategy game Solarmax 2 is now fully playable in Ruffle on the desktop player! Check out the video below.

<video muted autoplay controls>
    <source src="/2023-03-12-progress-report/ruffle_solarmax2.mp4" type="video/mp4">
</video>

Many of the fan-favorite **Flipline games are now playable**! Check them out:
- [Papa's Burgeria](https://www.kongregate.com/games/FliplineStudios/papas-burgeria)
- [Jacksmith](https://www.kongregate.com/games/FliplineStudios/jacksmith)
- [Papa's Cheeseria](https://www.flipline.com/games/papascheeseria/index.html) (requires the Ruffle Chrome extension)
- [Papa's Bakeria](https://www.flipline.com/games/papasbakeria/index.html) (requires the Ruffle Chrome extension)

<video muted autoplay controls>
    <source src="/2023-03-12-progress-report/ruffle_burgeria.mp4" type="video/mp4">
</video>

Here are just a few more of the many ActionScript 3 games that are playable today in Ruffle!
- [Canabalt](https://www.newgrounds.com/portal/view/510303)
- [Bloons Tower Defense 3](https://www.newgrounds.com/portal/view/463445/format/flash?emulate=flash)
- [Diggy](https://www.kongregate.com/games/Vogd/diggy)
- [Wooden Path 2](https://www.kongregate.com/games/Remivision/wooden-path-2)
- [Fracuum](https://www.newgrounds.com/portal/view/594354)
- [Dino Run: Marathon of Doom](https://www.newgrounds.com/portal/view/566176)

## Last but not least, support for **mobile devices** is improving in a big way!
- **Text input boxes** are finally supported on mobile devices! Tapping on a text box within Flash content now brings up the soft keyboard, so you can type into it without using a bluetooth keyboard or other workarounds.
- The **context menu** finally works on iOS! It is activated by a long-press on the screen. To stop this behavior if needed, simply tap the "Hide this menu" option.

<video muted autoplay controls>
    <source src="/2023-03-12-progress-report/Ruffle_Kongregate_Pizzeria_iPhone.mov" type="video/mp4">
</video>

**We have even more improvements coming very soon!**
- The latest releases now have **dynamic audio buffering**, making audio playback in the most demanding content much smoother! (Thanks to [@szőlő](https://github.com/torokati44/))
- A bug that causes some AVM2 games' intro sounds to repeat over and over will soon be fixed. (Thanks to [@Aaron1011](https://github.com/Aaron1011/))
- [@Dinnerbone](https://github.com/Dinnerbone/) is working on improving drawing accuracy for thin/hairline strokes and scaled objects. [You can follow his progress here](https://github.com/ruffle-rs/ruffle/pull/9981).
