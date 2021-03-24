export interface UserChecklist {
  id: string;
  lists: {
    [key: string]: lists;
  };
  completed: boolean;
  completedDate: string;
  surveyComplete: boolean;
  user: string;
  checklist: {
    header: {
      title: string;
      description: string;
    };
  };
}

export interface lists {
  id: string;
  description: string;
  tags: {
    [key: string]: tags;
  };
  title: string;
  checked: boolean;
}

export interface tags {
  id: string;
  title: string;
  checklists: string;
}
