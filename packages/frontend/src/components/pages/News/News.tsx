import type { NewsPageType } from '@lib/types';
import { NewsLayout } from '@templates';
import { mockData } from './News.mock';

type NewsProps = {
  pageType: NewsPageType;
};

function News({ pageType }: NewsProps) {
  return <NewsLayout pageType={pageType} data={mockData} />;
}

export default News;
