export type RecordsArgs = {
  message: string;
}
export type Link = {
  url: string;
  title: string;
}

export type Records = {
  mentions: string[];
  emoticons: string[];
  links: Link[];
}
