import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

const InfoBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between'
});

const InfoTypography = styled(Typography)({
  color: 'gray',
  marginBottom: '12px'
});

const ArchivedText = styled(Typography)({
  marginTop: '1rem'
});

export { InfoBox, InfoTypography, ArchivedText };
