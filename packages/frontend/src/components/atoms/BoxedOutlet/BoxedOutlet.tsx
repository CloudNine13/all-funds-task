import { Outlet } from 'react-router-dom';
import { StyledBox } from './BoxedOutlet.style';

const BoxedOutlet = () => {
  return (
    <StyledBox>
      <Outlet />
    </StyledBox>
  );
};

export default BoxedOutlet;
