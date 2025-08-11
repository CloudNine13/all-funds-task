import { NewsContext } from '@contexts';
import { NewsPageType } from '@lib/types';
import { NewsLayout } from '@templates';
import { useContext } from 'react';

type NewsProps = {
  pageType: NewsPageType;
};

const News = ({ pageType }: NewsProps) => {
  const { news } = useContext(NewsContext);

  return <NewsLayout news={news} pageType={pageType} />;
};

export default News;
