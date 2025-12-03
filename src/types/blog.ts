export type BlogContent =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "image";
      value: string;
    }
  | {
      type: "heading";
      value: string;
    };

export interface Blog {
  slug: string;
  title: string;
  author: string;
  date: string;
  cover: string;
  content: BlogContent[];
}
