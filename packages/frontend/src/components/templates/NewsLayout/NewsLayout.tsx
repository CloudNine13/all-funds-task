import { Container, NewsBox } from './NewsLayout.style';
import { CardContainer } from '@organisms';
import { ModalType, NewsPageType, type News } from '@lib/types';
import { NewsHeader } from '@molecules';
import { useState } from 'react';
import { Modal } from '@templates';

type NewsLayoutProps = {
  data: Array<News>;
  pageType: NewsPageType;
};

const NewsLayout = ({ data, pageType }: NewsLayoutProps) => {
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
        {data.length > 0 &&
          data.map((item) => <CardContainer key={item.title} pageType={pageType} data={item} />)}
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
