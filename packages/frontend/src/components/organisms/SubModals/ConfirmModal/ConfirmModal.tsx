import { Typography } from '@mui/material';
import { StyledBox, StyledButton, StyledContainer } from '../style';
import type { SubmodalProps } from '../types';

const ConfirmModal = ({ handleClose }: SubmodalProps) => {
  return (
    <StyledBox>
      <Typography variant="h4">Confirm removing article</Typography>
      <StyledContainer>
        <StyledButton onClick={handleClose}>Confirm</StyledButton>
        <StyledButton onClick={handleClose}>Cancel</StyledButton>
      </StyledContainer>
    </StyledBox>
  );
};

export default ConfirmModal;
