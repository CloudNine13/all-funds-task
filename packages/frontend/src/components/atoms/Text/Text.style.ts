import { ContentVariant } from '@lib/types';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const logo = {
  flexGrow: 1,
  fontFamily: 'monospace',
  fontWeight: 900,
  fontSize: '1.5rem',
  letterSpacing: '.2rem',
  color: 'inherit',
  textDecoration: 'none'
};

const StyledTypography = styled(Typography)<{ type?: ContentVariant }>(({ type }) => ({
  ...(type === ContentVariant.LOGO && logo)
}));

export { StyledTypography };
