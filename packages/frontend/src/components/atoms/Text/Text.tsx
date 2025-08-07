import type { ContentVariant } from '@lib/types';
import { StyledTypography } from './Text.style';
import type { TypographyProps } from '@mui/material';

type TextProps = {
  text: string;
  type?: ContentVariant;
};

const Text = ({ text, type, ...rest }: TextProps & TypographyProps) => {
  return (
    <StyledTypography type={type} {...rest}>
      {text}
    </StyledTypography>
  );
};

export default Text;
