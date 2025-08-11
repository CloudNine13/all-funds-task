import { Container, NewsBox } from './NewsLayout.style';
import { CardContainer } from '@organisms';
import { ModalType, NewsPageType, type NewsType } from '@lib/types';
import { NewsHeader } from '@molecules';
import { useState } from 'react';
import { Modal } from '@templates';
import { Pagination } from '@atoms';

type NewsLayoutProps = {
  news: Array<NewsType>;
  pageType: NewsPageType;
};

const NewsLayout = ({ news, pageType }: NewsLayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <NewsHeader pageType={pageType} openModal={handleOpenModal} />
      <NewsBox>
        {news.length > 0 &&
          news.map((item) => <CardContainer key={item.title} pageType={pageType} data={item} />)}
        <Pagination />
      </NewsBox>
      <Modal
        modalType={ModalType.ADD}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </Container>
  );
};

export default NewsLayout;
