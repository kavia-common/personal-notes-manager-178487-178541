export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
};

export type NotePatch = Partial<Pick<Note, 'title' | 'content'>>;
