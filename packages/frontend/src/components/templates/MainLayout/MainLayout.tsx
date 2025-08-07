import { BoxedOutlet } from '@atoms';
import { Toolbar } from '@organisms';

import { StyledAppBar, StyledBox } from './MainLayout.style';

const MainLayout = () => {
  return (
    <>
      <StyledBox>
        <StyledAppBar>
          <Toolbar />
        </StyledAppBar>
      </StyledBox>
      <BoxedOutlet />
    </>
  );
};

export default MainLayout;
