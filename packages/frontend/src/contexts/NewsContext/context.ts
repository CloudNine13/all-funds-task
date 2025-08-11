import type { NewsContextType } from '@lib/types';
import { createContext } from 'react';

const initialState: NewsContextType = {
  news: [],
  pageData: {
    page: 1,
    handlePageChange: () => {},
    pages: 1
  },
  archiveToggle: () => Promise.resolve()
};

export const NewsContext = createContext<NewsContextType>(initialState);
