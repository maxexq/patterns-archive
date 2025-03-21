// Set any item to undefined to remove it from the site or to use the default value

export const GLOBAL = {
  // Site metadata
  username: "maxexq",
  repo: "patterns-archive",
  baseUrl: "/patterns-archive",
  rootUrl: "https://maxexq.github.io/",
  shortDescription:
    "A fast, lightweight web app to store common coding patterns by GitHub issues.",
  longDescription:
    "Patterns Archive – A fast, lightweight web app built with Astro to store and organize common coding patterns (JS, TS, CSS, HTML, Git, etc.). Supports Markdown for easy formatting.",

  // Social media links
  githubProfile: "https://github.com/maxexq/patterns-archive",

  // Common text names used throughout the site
  articlesName: "Articles",
  viewAll: "View All",

  // Common descriptions used throughout the site
  noArticles: "No pattern articles yet.",

  // Menu items
  menu: {
    test: "Test",
  },

  // Available issues labels for showing on the site
  issuesLabel: ["state:published", "type:post"],
};
