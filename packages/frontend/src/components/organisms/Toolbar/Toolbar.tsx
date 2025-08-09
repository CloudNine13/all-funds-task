import { Tabs, ImageWithFallback } from '@molecules';
import { ContentVariant } from '@lib/types';
import { LOGO_URL, LOGO_TEXT } from './constants';
import { StyledText, StyledToolbar } from './Toolbar.style';

const Toolbar = () => {
  return (
    <StyledToolbar>
      <ImageWithFallback src={LOGO_URL} type={ContentVariant.LOGO} />
      <StyledText>{LOGO_TEXT}</StyledText>
      <Tabs />
    </StyledToolbar>
  );
};

export default Toolbar;
