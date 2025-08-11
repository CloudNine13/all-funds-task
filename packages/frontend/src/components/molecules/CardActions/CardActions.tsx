import { CardActions as MUICardActions, IconButton } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { ModalType, NewsPageType } from '@lib/types';
import { ExpandMore } from './CardActions.style';
import { useContext, useState } from 'react';
import { Modal } from '@templates';
import { NewsContext } from '@contexts';

type CardActionsProps = {
  newsId: string;
  pageType: NewsPageType;
  handleExpandClick: () => void;
  expanded: boolean;
};

const CardActions = ({ newsId, pageType, handleExpandClick, expanded }: CardActionsProps) => {
  const { archiveToggle } = useContext(NewsContext);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const isArchived = pageType === NewsPageType.ARCHIVED;

  const handleCloseModal = () => {
    setActiveModal(null);
    if (activeModal === ModalType.INFO) {
      archiveToggle({ id: newsId, date: isArchived ? null : new Date() });
      return;
    }
  };

  return (
    <MUICardActions disableSpacing>
      <IconButton onClick={() => setActiveModal(ModalType.INFO)}>
        {isArchived ? <UnarchiveIcon fontSize="large" /> : <ArchiveIcon fontSize="large" />}
      </IconButton>
      <IconButton onClick={() => setActiveModal(ModalType.CONFIRM)}>
        {isArchived && <DeleteForeverIcon fontSize="large" />}
      </IconButton>
      <ExpandMore expand={+expanded} onClick={handleExpandClick} aria-expanded={expanded}>
        <ExpandMoreIcon />
      </ExpandMore>
      <Modal
        modalType={activeModal}
        isModalOpen={activeModal !== null}
        handleCloseModal={handleCloseModal}
      />
    </MUICardActions>
  );
};

export default CardActions;
