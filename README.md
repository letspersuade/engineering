# github-pages-demo

## Editing on Github
Feel free to edit the documents for your relevant practice or discipline directly on Github. The documents are written in markdown and can be authored and edited directly from the Github interface without having to pull the code down locally.

## Local Development
You can pull down the site source and modify styles and documents locally. This has the added benefit of previewing your content and how it will render locally on your machine before pushing it into the repo.

### Build
`make build`

### Run
`make serve`

## Deploy
By committing document changes to the `main` branch, Github Actions will automatically run `make build` and deploy the static site out to the `gh-pages` branch, which is what is configured in the document repo as the static source for the Github Pages site. 
