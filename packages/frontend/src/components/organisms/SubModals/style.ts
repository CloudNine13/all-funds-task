import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

const StyledBox = styled(Box)({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: '2px 2px 6px',
  padding: '20px',
  gap: 15
});

const StyledContainer = styled(Box)({
  gap: 5,
  display: 'flex',
  flexDirection: 'row'
});

const StyledButton = styled(Button)({
  color: 'black'
});

export { StyledBox, StyledContainer, StyledButton };
