import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

const ExpandMore = styled(IconButton)<{ expand: number }>(({ expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: 'transform 0.2s'
}));

export { ExpandMore };
