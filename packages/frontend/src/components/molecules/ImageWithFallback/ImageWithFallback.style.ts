import styled from '@emotion/styled';
import { ContentVariant } from '@lib/types';

const logo = {
  height: 48,
  width: 48
};

export const StyledImage = styled('img')<{ type?: ContentVariant }>(({ type }) => ({
  ...(type === ContentVariant.LOGO && logo)
}));
