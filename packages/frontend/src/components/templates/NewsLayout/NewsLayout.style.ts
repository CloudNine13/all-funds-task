import styled from '@emotion/styled';
import { Box } from '@mui/material';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});

const NewsBox = styled(Box)({
  boxShadow: '1px 3px 5px',
  borderRadius: '15px',
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px'
});

export { Container, NewsBox };
