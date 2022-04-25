# Ruffle website

The Ruffle website uses [Jekyll](https://jekyllrb.com/). It is visible at https://ruffle.rs/

To test it locally, you should clone the repository (`git clone https://github.com/ruffle-rs/ruffle-rs.github.io.git`). If you plan to create a pull request, you should instead [fork the repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo), then [clone the forked repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository). Either way, you should then install all the pre-requisites for your system as described in https://jekyllrb.com/docs/installation/.

Then, navigate to the directory where you cloned the repository and run:
- `gem install jekyll bundler`
- `bundle exec jekyll serve`

If you are told `cannot load such file -- webrick`, run `bundle add webrick`. If you are told you are missing gems when bundling, run `bundle install` and then re-run `bundle exec jekyll serve`. If everything worked properly, a copy of the website should be up and running at http://localhost:4000 and any changes you make to the code should appear there.
