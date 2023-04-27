export interface Result {
  package: {
    date: string;
    description: string;
    name: string;
    version: string;
    links: {
      npm: string;
    };
    keywords?: string[];
    author?: {
      name: string;
    };
    publisher: {
      username: string;
    };
  };
}
