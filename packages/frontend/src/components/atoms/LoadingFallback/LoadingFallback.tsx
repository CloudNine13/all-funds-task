import CircularProgress from '@mui/material/CircularProgress';

import { StyledBox } from './LoadingFallback.style';

const LoadingFallback = () => {
  return (
    <StyledBox>
      <CircularProgress />
    </StyledBox>
  );
};

export default LoadingFallback;
