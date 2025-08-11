import type { ChangeEvent } from 'react';
import type { NewsType } from './News';
import type { ArchiveToggleType } from './ArchiveToggleType';

type NewsContextType = {
  news: Array<NewsType>;
  pageData: {
    page: number;
    handlePageChange: (_: ChangeEvent<unknown>, value: number) => void;
    pages: number;
  };
  archiveToggle: ArchiveToggleType;
};

export type { NewsContextType };
