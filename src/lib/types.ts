export type ArticleFrontmatter = {
  /**
   * The title of the project
   */
  title: string;

  /**
   * The markdown content of the project
   */
  markdownBody: string;

  /**
   * The tags of the project
   * (eg. ["JavaScript", "React", "Node.js"])
   */
  tags?: string[];

  /**
   * The GitHub issue URL of the project
   */
  url: string;

  /**
   * The date the project was created or started in W3C format
   * (this will determine the sort order of the projects)
   */
  timestamp: string;
};

export type IssuesTag = {
  /**
   * The id of the tag
   * (eg. 1)
   */
  id?: number;

  /**
   * The node_id of the tag
   * (eg. "MDU6TGFiZWwx")
   */
  node_id?: string;

  /**
   * The url of the tag
   * (eg. "https://api.github.com/repos/maxexq/patterns-archive/labels/bug")
   */
  url?: string;

  /**
   * The name of the tag
   * (eg. "bug")
   */
  name?: string;

  /**
   * The color of the tag
   * (eg. "d73a4a")
   */
  description?: string | null;

  /**
   * The default of the tag
   * (eg. false)
   */
  color?: string | null;

  /**
   * The default of the tag
   * (eg. false)
   */
  default?: boolean;
};
