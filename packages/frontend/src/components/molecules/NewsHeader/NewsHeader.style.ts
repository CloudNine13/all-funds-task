import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1.5rem'
});

const HeaderText = styled(Typography)({
  '::selection': { display: 'none' }
});

export { Header, HeaderText };
