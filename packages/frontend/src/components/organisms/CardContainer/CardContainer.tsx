import { ImageVariant, ModalType, NewsPageType, type NewsType } from '@lib/types';
import { CardContent, Collapse, Typography } from '@mui/material';

import { useState } from 'react';
import { Modal } from '@templates';
import { StyledCard } from './CardContainer.style';
import { CardActions, CardMainInfo, ImageWithFallback } from '@molecules';

type ContainerProps = {
  data: NewsType;
  pageType: NewsPageType;
};

const CardContainer = ({ data, pageType }: ContainerProps) => {
  const [expanded, setExpanded] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <StyledCard>
      <ImageWithFallback type={ImageVariant.NORMAL} height={300} src={data.image} />
      <CardMainInfo data={data} />
      <CardActions
        pageType={pageType}
        handleOpenModal={handleOpenModal}
        expanded={expanded}
        handleExpandClick={handleExpandClick}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body1">{data.content}</Typography>
        </CardContent>
      </Collapse>
      <Modal
        modalType={activeModal}
        isModalOpen={activeModal !== null}
        handleCloseModal={handleCloseModal}
      />
    </StyledCard>
  );
};

export default CardContainer;
