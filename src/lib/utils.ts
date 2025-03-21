import fs from "node:fs/promises";
import { GLOBAL } from "./variables";
import type { IssuesTag } from "./types";

type MarkdownData<T extends object> = {
  frontmatter: T;
  file: string;
  url: string;
};

/**
 * This function processes the content of a directory and returns an array of processed content.
 * It takes a content type, a function to process the content, and an optional directory.
 * If no directory is provided, it defaults to the current working directory.
 *
 * @param contentType the type of content to process
 * @param processFn the function to process the content
 * @param dir the directory to process the content from
 * @returns a promise that resolves to an array of processed content
 */
export const processContentInDir = async <T extends object, K>(
  contentType: "projects" | "blog",
  processFn: (data: MarkdownData<T>) => K,
  dir: string = process.cwd()
) => {
  const files = await fs.readdir(dir + `/src/pages/${contentType}`);
  const markdownFiles = files
    .filter((file: string) => file.endsWith(".md"))
    .map((file) => file.split(".")[0]);
  const readMdFileContent = async (file: string) => {
    if (contentType === "projects") {
      const content = import.meta
        .glob(`/src/pages/projects/*.md`)
        [`/src/pages/projects/${file}.md`]();
      const data = (await content) as {
        frontmatter: T;
        file: string;
        url: string;
      };
      return processFn(data);
    } else {
      const content = import.meta
        .glob(`/src/pages/blog/*.md`)
        [`/src/pages/blog/${file}.md`]();
      const data = (await content) as {
        frontmatter: T;
        file: string;
        url: string;
      };
      return processFn(data);
    }
  };
  return await Promise.all(markdownFiles.map(readMdFileContent));
};

/**
 * Shortens a string by removing words at the end until it fits within a certain length.
 * @param content the content to shorten
 * @param maxLength the maximum length of the shortened content (default is 20)
 * @returns a shortened version of the content
 */
export const getShortDescription = (content: string, maxLength = 20) => {
  const splitByWord = content.split(" ");
  const length = splitByWord.length;
  return length > maxLength
    ? splitByWord.slice(0, maxLength).join(" ") + "..."
    : content;
};

/**
 * Processes the date of an article and returns a string representing the processed date.
 * @param timestamp the timestamp to process
 * @returns a string representing the processed timestamp
 */
export const processArticleDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const monthSmall = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${monthSmall} ${day}, ${year}`;
};

/**
 * Generates a source URL for a content item. The URL is used in meta tags and social media cards.
 * @param sourceUrl the source URL of the content
 * @param contentType the type of content (either "projects" or "blog")
 * @returns a string representing the source URL with the appropriate domain
 */
export const generateSourceUrl = (
  sourceUrl: string,
  contentType: "projects" | "blog"
) => {
  return `${GLOBAL.rootUrl}/${contentType}/${sourceUrl}`;
};

/**
 * Renders the tags of an article.
 * @param tags the tags of the article
 * @returns an array of tags
 */
export const renderArticleTags = (tags: (string | IssuesTag)[]) => {
  return tags
    .filter(
      (label) => typeof label === "object" && label.name?.startsWith("tag:")
    )
    .map((label) => (label as { name: string }).name.split(":")[1]);
};

/**
 * Formats the title of an article.
 * @param title the title of the article
 * @returns a formatted title
 */
export const formatArticleTitle = (title: string) =>
  title
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/`([^`]+?)`/g, "<code>$1</code>");

/**
 * Removes repeated pre code blocks from a markdown string.
 * @param md the markdown string to process
 * @returns a markdown string with repeated pre code blocks removed
 */

export const removeRepeatPreCode = (md: string) => {
  return md
    .replace(/<pre><code class="language-.+?">/g, "")
    .replace(/<\/code><\/pre>\n<\/code><\/pre>/g, "</code></pre>")
    .replace(
      /(<pre class="shiki.+?>)/g,
      '$1<button type="button" onclick="copy(this)" aria-label="Copy to clipboard" class="copy-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" /></svg></button>'
    );
};

/**
 * Makes all links in a markdown string open in a new tab.
 * @param md the markdown string to process
 * @returns a markdown string with all links set to open in a new tab
 */
export const makeLinkExternal = (md: string) => {
  return md.replace(
    /<a href="(.+?)"/g,
    '<a href="$1" target="_blank" rel="nofollow noopener noreferrer" title="$1"'
  );
};

/**
 * Formats a markdown string.
 * @param md the markdown string to format
 * @returns a formatted markdown string
 */
export const formatMd = (md: string) => {
  return makeLinkExternal(removeRepeatPreCode(md));
};
