import type { ChangeEvent } from 'react';
import type { NewsType } from './News';

type NewsContextType = {
  news: Array<NewsType>;
  pageData: {
    page: number;
    handlePageChange: (_: ChangeEvent<unknown>, value: number) => void;
    pages: number;
  };
  archiveToggle: ({ id, archived }: { id: string; archived: boolean }) => Promise<void>;
};

export type { NewsContextType };
