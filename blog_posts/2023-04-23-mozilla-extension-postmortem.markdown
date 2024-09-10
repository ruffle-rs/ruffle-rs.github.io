---
title:  "A post-mortem of Ruffle's removal from addons.mozilla.org"
date:   2023-04-23 04:07:00 -0400
author: kmeisthax
icon: /undraw/undraw_feeling_blue_-4-b7q.svg
---

On December 11th, 2022, our extension submissions to Firefox's extension repository, addons.mozilla.org (abbreviated as A.M.O), got stuck in review. This was shortly followed up with a far scarier notice a few days later on the 14th:

>Ruffle will be disabled on addons.mozilla.org
>Due to issues discovered during the review process, one or more versions of your add-on Ruffle will be disabled on addons.mozilla.org in 14 day(s).

What followed was a list of every prior submitted version of Ruffle, and a statement requesting corresponding source code. Following this, Ruffle would be unavailable for Firefox users for two months, and we spent an additional month and a half improving our CI processes to support source code review requirements for Mozilla. This is now behind us, but it is important to know why it happened.

---

## The initial response

Our first attempt to satisfy the requirement was very naive: Mike uploads the source repository for the latest submitted version of Ruffle, version 0.1.0.685. He also includes build instructions. What followed was a game of ping-pong between Ruffle's maintainers and Mozilla's extension review team. The first reviewer skipped the `cd web` step and got an error. The second reviewer was able to correctly launch the build system, but hadn't installed a JVM. Our ActionScript 3 support requires Java, as we wrote significant portions of our AS3 builtins in ActionScript itself, which needs to be compiled by a Java binary. However, we'd failed to mention that in our build system documentation. [Oops.](https://github.com/ruffle-rs/ruffle/pull/8959)

At this point, Ruffle has already been removed from addons.mozilla.org, and [people noticed](https://github.com/ruffle-rs/ruffle/issues/8799#issuecomment-1368047327). divinity76 suggested having Mozilla build Ruffle using Docker, because we could have the `Dockerfile` install all necessary prerequisites - it'd be harder to screw up. This was [merged in](https://github.com/ruffle-rs/ruffle/pull/9066) on January 7th.

I continued pressing on with reviewer ping-pong on Mike's behalf. 0.1.0.685 was already rejected at this point, which meant that I had to submit 0.1.0.712, along with corrected build instructions. This time, the reviewer failed to install rustc instead of the JVM. Since the Dockerfile was part of 0.1.0.712, I suggested using that. The reviewer correctly built Ruffle with the Dockerfile, but the submission was rejected anyway because the compiled source code did not match the XPI we submitted.

## Diffing intensifies

Mozilla sent over the version of the extension that they built. My first instinct was to diff all the files in both XPIs. This turns up three major categories of differences:

 * Version data embedded in various JavaScript files is wrong.
 * The manifest file is missing the extension ID.
 * The WASM files themselves are different by about four bytes. Because Webpack names the files by hash, this causes knock-on differences with file names elsewhere.

For my own sanity, I only considered differences "up to ZIP isomorphism." The packaging format used for Firefox extensions, XPI, is a renamed ZIP file with specific contents. This is a common pattern - APK, CRX, EPUB, DOCX, and even Adobe Animate's own XFL format are PKZIP bitstreams with additional constraints. Problem is, ZIP files can have dates in them, and the order in which files are stored will be determined by how the operating system and filesystem enumerate directories. All of which would fail a repro check if Mozilla wanted bit-identical XPIs.

The first two problems were caused by various build system scripts relying on environment data that is only available during the nightly build process. Said scripts were changed to instead get that information from a version seal file, if available. The nightly build process would also generate special source ZIPs with this version seal present. A [few](https://github.com/ruffle-rs/ruffle/pull/9244) [rounds](https://github.com/ruffle-rs/ruffle/pull/9344) [of](https://github.com/ruffle-rs/ruffle/pull/9353) [back and](https://github.com/ruffle-rs/ruffle/pull/9570) [forth](https://github.com/ruffle-rs/ruffle/pull/9633) with GitHub Actions and this reproducibility hole was filled.

The WASM files would be more complicated. When building my laptop running Ubuntu, I would only get the four bytes difference in WASM if I built with my clock set ahead by several days. It was two entries in a dispatch table that has been reordered, and this table only existed in *one* of the two WASM files. We'd recently added a "dual-WASM" mode that enabled better optimizations for newer browsers. Discussions in maintainer chat considered either disabling dual-WASM (divinity76 was busy [adding it to the Dockerfile](https://github.com/ruffle-rs/ruffle/pull/9121#issuecomment-1396261394)) or writing some complicated "WASM sorter" to ensure the table was ordered correctly.

It turned out that this difference was a fluke. Another test build done on February 2nd was identical across multiple runs. I submitted 0.1.0.742 the next day.

## Reproducible means reproducible!

Mozilla took more than a week to review this submission. The first time they looked for the XPI in the wrong place. The second time they caught actually obfuscated code in our extension script:

> Your add-on contains minified, concatenated or otherwise machine-generated code. (boilerplate response omitted)
> - web/packages/extension/src/content.ts [line 145-147](https://github.com/ruffle-rs/ruffle/pull/9588/files#diff-61744725fdd3172f6802244512c95dca65e7e70a722af0e99224d65d46759d3c)

The intent of this code was to load parts of our extension's plugin polyfill as early as possible. However, this had been implemented by manually compiling one of our source files and copying the output back into the content script. Not only was this code causing us to fail review, it was also very old. This was fixed by [implementing a proper build step for this](https://github.com/ruffle-rs/ruffle/pull/9588), ensuring that the code would no longer be obfuscated and also remain up to date.

I submitted 0.1.0.758 on February 20th, 2023, and then submitted 0.1.0.760 two days later by accident.

It's important to remember that during all of this, we're still using the nightly release workflow to submit the extension. This is designed to run every night, but we don't actually want it to do that, since Mozilla no longer approves extension builds that quickly. To deal with this, I'm manually enabling and disabling certain GitHub Actions secrets relating to extension submission so that the build process skips Firefox submission when I don't want it to submit.

Furthermore, we don't actually have the ability to automate extension source code upload - I have to jump in after submission to upload the source code and the build instructions. This causes a problem when I submit two versions by accident. I submit the correct code for 0.1.0.758, and then get an e-mail a few days later complaining that 0.1.0.760 is missing source code, because Mozilla will (rightly) not let you 'queue up' multiple submissions.

0.1.0.760 is approved on February 23rd, marking Ruffle's return to addons.mozilla.org.

## CI

While users can now use Ruffle again, we still need our fully automated upload pipeline. Having a maintainer fiddle with our Secrets configuration and upload two files to our addons.mozilla.org account every time we want to release is annoying and error-prone.

Problem is, our extension submission relies on `sign-addon`, a deprecated Mozilla library for submitting addons. This uses version 4 of the addons.mozilla.org API; source code upload is part of version 5. I wrote a PR [to upload source after the fact](https://github.com/ruffle-rs/ruffle/pull/9752) using API version 5 after the version 4 base upload completes. I get an actually helpful comment from diox, an addons.mozilla.org maintainer, explaining that `web-ext` will eventually be getting everything we need. In the meantime I merge in the PR.

And [another](https://github.com/ruffle-rs/ruffle/pull/9982), and [another](https://github.com/ruffle-rs/ruffle/pull/10260), and [another](https://github.com/ruffle-rs/ruffle/pull/10276), and [another](https://github.com/ruffle-rs/ruffle/pull/10351). While I probably could have avoided some of these excess PRs with an A.M.O. test environment, or separate credentials for testing, I don't have a good test environment for GitHub Actions itself. And this is part of our normal nightly release workflow, which isn't idempotent and will fail if I run it more than once a day. We also can't stack submissions on A.M.O, so I'm stuck with a week-long edit-test-debug cycle.

This doesn't particularly *matter* since Ruffle users are getting updates again, but our first fully-automated submission with source code is 0.1.0.798 on March 24th.

After I submitted 0.1.0.760 a month ago, I suggested a weekly release cycle for Firefox in maintainer chat, based on Mozilla approving releases once every six days. So the last thing to do is to actually move Firefox to a separate weekly release workflow, so I don't have to manually turn it on and off every Friday. Furthermore, since it's a separate workflow that doesn't create Git tags, I can trigger it as many times as I like for debugging. 0.1.0.807 is submitted using the new process... but for some reason addons.mozilla.org times out and I have to upload manually.

The next weekly, 0.1.0.813, uploads automatically. The process was so smooth I literally forgot to check if it succeeded - I only noticed after seeing the approval the next Thursday. Firefox is fixed.

## Context

It's tempting to read into this and get angry at Mozilla, but we also have to look at this from their perspective. Extension review is necessary to keep extensions from turning into data theft and ad-jacking operations, and average users should only be running properly reviewed extensions. We also made several mistakes during our response process that delayed our return to addons.mozilla.org. And the process resulted in genuine problems with our code being found and fixed.

However, we are not the only extension that had problems with Mozilla recently. Unwanted YouTube channel blocker BlockTube [was removed for the same reasons we were](https://github.com/amitbl/blocktube/issues/281), but with the added bonus of having to explain to extension review that they need `eval()` to load user-provided blocking JS. Web accessibility auditing extension WAVE [also got flagged for source code](https://discourse.mozilla.org/t/add-on-review-questions/82754/119), with confusing and irrelevant instruction being provided to them. While Mozilla has [plainly documented](https://extensionworkshop.com/documentation/publish/source-code-submission/) their source code submission requirement since at least 2019 (as far back as the Wayback Machine shows), their review staff is still struggling with the source code they are given.

My hope is that this postmortem will at least serve as a guide for other extension developers trying to pass reproducibility checks when A.M.O reviewers ask for them.
