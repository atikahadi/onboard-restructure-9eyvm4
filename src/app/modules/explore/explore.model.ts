export interface Explore {
  header: {
    id: string;
    title: string;
    description: string;
  };
  page: [
    {
      contents: [
        {
          id: string;
          title: string;
          media: [
            {
              url: string;
            }
          ];
          subtitle: string;
          content: string;
        }
      ];
      links: [
        {
          title: string;
          url: string;
        }
      ];
    }
  ];
  jumbotron: {
    id: string;
    title: string;
    description: string;
    subtitle: string;
    backgroundImage: {
      url: string;
    };
  };
}
