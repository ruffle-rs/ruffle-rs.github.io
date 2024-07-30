This is a [Next.js](https://nextjs.org/) project that makes up the [Ruffle website](https://ruffle.rs).

## Developing locally

To run the development server locally, use `npm run dev`. Then open up [http://localhost:3000](http://localhost:3000) and see the pages live.

To build it as a static website (as we do in production), use `npm run build`.

## Configure GitHub tokens

To get the GitHub parts working (Releases & Contribution graph), you'll need to create and assign a GitHub personal access token.

For instructions on how to create a PAT, see [GitHub's documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token).

The PAT only needs **read only access** to `ruffle-rs/ruffle` (contents and metadata), or to be lazy, pick "Public Repositories (read-only)".

Set the PAT on the `GITHUB_TOKEN` environment variable for `npm run build`/`npm run dev` to pick it up.

## Configure URL

Some parts of the website require absolute URLs, such as opengraph data. It fetches this from the environment variable `BASE_URL`.

In local development you'll probably want to set it to `http://localhost:3000`, and in production we use `https://ruffle.rs`
