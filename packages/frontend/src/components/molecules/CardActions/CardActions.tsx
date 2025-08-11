import { CardActions as MUICardActions, IconButton } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { ModalType, NewsPageType } from '@lib/types';
import { ExpandMore } from './CardActions.style';

type CardActionsProps = {
  pageType: NewsPageType;
  handleOpenModal: (modalType: ModalType) => void;
  handleExpandClick: () => void;
  expanded: boolean;
};

const CardActions = ({
  pageType,
  handleOpenModal,
  handleExpandClick,
  expanded
}: CardActionsProps) => {
  return (
    <MUICardActions disableSpacing>
      <IconButton onClick={() => handleOpenModal(ModalType.INFO)}>
        {pageType === NewsPageType.ARCHIVED ? (
          <UnarchiveIcon fontSize="large" />
        ) : (
          <ArchiveIcon fontSize="large" />
        )}
      </IconButton>
      <IconButton onClick={() => handleOpenModal(ModalType.CONFIRM)}>
        {pageType === NewsPageType.ARCHIVED && <DeleteForeverIcon fontSize="large" />}
      </IconButton>
      <ExpandMore expand={+expanded} onClick={handleExpandClick} aria-expanded={expanded}>
        <ExpandMoreIcon />
      </ExpandMore>
    </MUICardActions>
  );
};

export default CardActions;
