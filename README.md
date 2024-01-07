This is a [Next.js](https://nextjs.org/) project that makes up the [Ruffle website](https://ruffle.rs).

## Developing locally

To run the development server locally, use `npm run dev`. Then open up  [http://localhost:3000](http://localhost:3000) and see the pages live.

To build it as a static website (as we do in production), use `npm run build`.

## Configure github tokens

To get the github parts working (Releases & Contribution graph), you'll need to create and assign a github personal access token.

For instructions on how to create a PAT, see [Github's documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token).

The PAT only needs **read only access** to `ruffle-rs/ruffle` (contents and metadata), or to be lazy, pick "Public Repositories (read-only)".

Set the PAT on the `GITHUB_TOKEN` environment variable for `npm run build`/`npm run dev` to pick it up.
