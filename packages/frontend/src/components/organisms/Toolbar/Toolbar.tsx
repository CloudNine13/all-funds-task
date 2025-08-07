import { Tabs, ImageWithFallback } from '@molecules';
import { ContentVariant } from '@lib/types';
import { LOGO_URL, LOGO_TEXT } from './constants';
import { StyledToolbar, LogoText } from './Toolbar.style';

const Toolbar = () => {
  return (
    <StyledToolbar>
      <ImageWithFallback src={LOGO_URL} type={ContentVariant.LOGO} />
      <LogoText text={LOGO_TEXT} type={ContentVariant.LOGO} />
      <Tabs />
    </StyledToolbar>
  );
};

export default Toolbar;
