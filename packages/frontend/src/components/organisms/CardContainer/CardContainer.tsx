import { ModalType, NewsPageType, type News } from '@lib/types';
import { CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { StyledCard, StyledTypography } from './CardContainer.style';
import { useState } from 'react';
import { Modal } from '../../templates/Modal';

type ContainerProps = {
  data: News;
  pageType: NewsPageType;
};

const CardContainer = ({ data, pageType }: ContainerProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenInfoModal = () => {
    setIsInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
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
        <IconButton onClick={handleOpenInfoModal}>
          <ArchiveIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={handleOpenDeleteModal}>
          {pageType === NewsPageType.ARCHIVED && <DeleteForeverIcon fontSize="large" />}
        </IconButton>
      </CardActions>
      <Modal
        modalType={ModalType.CONFIRM}
        isModalOpen={isDeleteModalOpen}
        handleCloseModal={handleCloseDeleteModal}
      />
      <Modal
        modalType={ModalType.INFO}
        isModalOpen={isInfoModalOpen}
        handleCloseModal={handleCloseInfoModal}
      />
    </StyledCard>
  );
};

export default CardContainer;
