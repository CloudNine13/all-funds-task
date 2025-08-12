import type { ChangeEvent } from 'react';
import type { NewsType } from './News';
import type { AddDataType } from './AddDataType';

type NewsContextType = {
  news: Array<NewsType>;
  pageData: {
    page: number;
    handlePageChange: (_: ChangeEvent<unknown>, value: number) => void;
    pages: number;
  };
  archiveToggle: (props: { id: string; date: Date | null }) => Promise<void>;
  addNews: (props: AddDataType) => Promise<void>;
  removeNews: ({ id }: { id: string }) => Promise<void>;
};

export type { NewsContextType };
