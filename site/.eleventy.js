module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./site/assets");
  eleventyConfig.addPassthroughCopy({ "./site/assets": "assets" });

  // Convert relative Markdown file links to relative post links
  const customMarkdownIt = require("markdown-it")({
    html: true,
    replaceLink: (link) =>
      link.replace(/^([^/][^:]*)\.md(#[^#]+)?$/, "../$1/$2"),
  }).use(require("markdown-it-replace-link"));

  eleventyConfig.setLibrary("md", customMarkdownIt);
  // Return your Object options:
  return {
    dir: {
      input: "docs",
      output: "_site",
      includes: "../site/includes",
      layouts: "../site/includes",
    },
  };
};
