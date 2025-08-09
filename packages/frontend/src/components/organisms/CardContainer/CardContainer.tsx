import { ModalType, NewsPageType, type News } from '@lib/types';
import { CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { StyledCard, StyledTypography } from './CardContainer.style';
import { useState } from 'react';
import { Modal } from '@templates';

type ContainerProps = {
  data: News;
  pageType: NewsPageType;
};

const CardContainer = ({ data, pageType }: ContainerProps) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const handleOpenModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <StyledCard>
      <CardMedia component="img" alt="news image" height="300" loading="lazy" image={data.image} />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {data.title}
        </Typography>
        <StyledTypography variant="body2">{data.description}</StyledTypography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => handleOpenModal(ModalType.INFO)}>
          <ArchiveIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => handleOpenModal(ModalType.CONFIRM)}>
          {pageType === NewsPageType.ARCHIVED && <DeleteForeverIcon fontSize="large" />}
        </IconButton>
      </CardActions>
      <Modal
        modalType={activeModal}
        isModalOpen={activeModal !== null}
        handleCloseModal={handleCloseModal}
      />
    </StyledCard>
  );
};

export default CardContainer;
