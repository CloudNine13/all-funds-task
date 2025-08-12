import { StyledIconButton } from './AddButton.style';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddButton = ({ openModal }: { openModal: () => void }) => {
  return (
    <StyledIconButton>
      <AddCircleIcon
        fontSize="large"
        onClick={() => {
          openModal();
        }}
      />
    </StyledIconButton>
  );
};

export default AddButton;
