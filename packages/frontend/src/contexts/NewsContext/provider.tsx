import { getNews, updateNews } from '@api';
import { LoadingFallback } from '@atoms';
import { NewsPageType, type NewsType } from '@lib/types';
import { type ChangeEvent, type ReactNode, useCallback, useEffect, useState } from 'react';
import { NewsContext } from './context';

type ProviderProps = {
  children: ReactNode;
  pageType: NewsPageType;
};

export const NewsProvider = ({ children, pageType }: ProviderProps) => {
  const archived = pageType === NewsPageType.ARCHIVED;
  const [news, setNews] = useState<Array<NewsType>>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNews = useCallback(async ({ page, archived }: { page: number; archived: boolean }) => {
    try {
      setIsLoading(true);
      const response = await getNews({ archived, page, limit: 5 });
      setNews(response.news);
      setPages(response.pages);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews({ page, archived });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, archived]);

  const archiveToggle = useCallback(async ({ id, archived }: { id: string; archived: boolean }) => {
    await updateNews({ id, archived });
    await fetchNews({ page, archived });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = useCallback(async (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  const value = {
    news,
    pageData: { page, handlePageChange, pages },
    archiveToggle
  };

  return (
    <NewsContext.Provider value={value}>
      {isLoading ? <LoadingFallback /> : children}
    </NewsContext.Provider>
  );
};
