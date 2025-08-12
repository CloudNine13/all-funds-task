import { Typography } from '@mui/material';
import { StyledBox, StyledButton, StyledContainer } from '../style';
import type { SubmodalProps } from '../types';
import { BUTTONS } from '@constants';

const ConfirmModal = ({ handleClose }: SubmodalProps) => {
  return (
    <StyledBox>
      <Typography variant="h4">Confirm removing article</Typography>
      <StyledContainer>
        <StyledButton onClick={() => handleClose()}>{BUTTONS.CONFIRM}</StyledButton>
        <StyledButton onClick={() => handleClose(true)}>{BUTTONS.CANCEL}</StyledButton>
      </StyledContainer>
    </StyledBox>
  );
};

export default ConfirmModal;
