export interface About {
  page: [
    {
      contents: [
        {
          id: string;
          title: string;
          subtitle: string;
          media: {
            url: string;
          };
          content: string;
        }
      ];
    }
  ];
  header: {
    id: string;
    title: string;
    description: string;
  };
  banner: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    background: {
      url: string;
    };
  };
}
