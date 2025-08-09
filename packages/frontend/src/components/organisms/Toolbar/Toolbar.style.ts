import styled from '@emotion/styled';
import { Toolbar as MUIToolbar } from '@mui/material';

const StyledToolbar = styled(MUIToolbar)({
  backgroundColor: '#C0C4C4'
});

const StyledText = styled(MUIToolbar)({
  marginLeft: '16px',
  color: '#363A36',
  flexGrow: 1,
  fontFamily: 'monospace',
  fontWeight: 900,
  fontSize: '1.5rem',
  letterSpacing: '.2rem',
  textDecoration: 'none'
});

export { StyledToolbar, StyledText };
