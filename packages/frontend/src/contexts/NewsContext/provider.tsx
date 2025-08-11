import { getNews, updateNews, saveNews, deleteNews } from '@api';
import { LoadingFallback } from '@atoms';
import { NewsPageType, type ApiFunctionType, type NewsType } from '@lib/types';
import { type ChangeEvent, type ReactNode, useCallback, useEffect, useState } from 'react';
import { NewsContext } from './context';
import { generateRandomString } from '@lib/utils';
import { NEWS_ITEMS_PER_PAGE, RANDOM_IMG } from './constants';

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
      const response = await getNews({ archived, page, limit: NEWS_ITEMS_PER_PAGE });
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

  const archiveToggle: ApiFunctionType<{ id: string; date: Date | null }> = useCallback(
    async ({ id, date }) => {
      await updateNews({ id: id as string, date: date as Date | null });
      await fetchNews({ page, archived });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const addNews: ApiFunctionType<{
    title: string;
    description: string;
    author: string;
    content: string;
  }> = useCallback(
    async ({ title, description, author, content }) => {
      const image = RANDOM_IMG.replace('randomImage', generateRandomString());
      const date = new Date();
      await saveNews({ title, description, author, content, image, date });
      if (!archived) await fetchNews({ page, archived });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const removeNews: ApiFunctionType<{ id: string }> = async ({ id }) => {
    await deleteNews({ id });
    await fetchNews({ page, archived });
  };

  const handlePageChange = useCallback(async (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  const value = {
    news,
    pageData: { page, handlePageChange, pages },
    archiveToggle,
    addNews,
    removeNews
  };

  return (
    <NewsContext.Provider value={value}>
      {isLoading ? <LoadingFallback /> : children}
    </NewsContext.Provider>
  );
};
