import CircularProgress from '@mui/material/CircularProgress';

import { StyledBox } from './LoadingFallback.style';

const LoadingFallback = () => {
  return (
    <StyledBox>
      <CircularProgress variant="indeterminate" color="secondary" size={60} thickness={8} />
    </StyledBox>
  );
};

export default LoadingFallback;
