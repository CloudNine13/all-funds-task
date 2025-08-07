import styled from '@emotion/styled';
import { Tabs } from '@mui/material';

export const StyledTabs = styled(Tabs)({
  '& .MuiTab-root': {
    color: '#4B4F4B',
    fontWeight: 500,
    '&.Mui-selected': {
      color: '#272927',
      fontWeight: 800
    }
  }
});
