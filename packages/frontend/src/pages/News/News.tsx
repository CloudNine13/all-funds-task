import type { NewsPageType } from '@lib/types';

type NewsProps = {
  pageType: NewsPageType;
};

function News({ pageType }: NewsProps) {
  return (
    <>
      <h1>{pageType}</h1>
    </>
  );
}

export default News;
