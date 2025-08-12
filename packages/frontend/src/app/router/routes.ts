import { News } from '@pages';
import { NewsPageType } from '@lib/types';

const routes = [
  {
    path: '/',
    element: News,
    pageType: NewsPageType.ARTICLES
  },
  {
    path: '/archived',
    element: News,
    pageType: NewsPageType.ARCHIVED
  }
];

export { routes };
