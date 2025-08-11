import { ImageVariant, NewsPageType, type NewsType } from '@lib/types';
import { CardContent, Collapse, Typography } from '@mui/material';

import { useState } from 'react';
import { StyledCard } from './CardContainer.style';
import { CardActions, CardMainInfo, ImageWithFallback } from '@molecules';
import { IMAGE_DEFAULT_HEIGHT } from './constants';
import { COLLAPSE_TIMEOUT_AUTO, TYPOGRAPHY_BODY1_VARIANT } from '@constants';

type ContainerProps = {
  data: NewsType;
  pageType: NewsPageType;
};

const CardContainer = ({ data, pageType }: ContainerProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard>
      <ImageWithFallback
        type={ImageVariant.NORMAL}
        height={IMAGE_DEFAULT_HEIGHT}
        src={data.image}
      />
      <CardMainInfo data={data} />
      <CardActions
        newsId={data._id}
        pageType={pageType}
        expanded={expanded}
        handleExpandClick={handleExpandClick}
      />
      <Collapse in={expanded} timeout={COLLAPSE_TIMEOUT_AUTO} unmountOnExit>
        <CardContent>
          <Typography variant={TYPOGRAPHY_BODY1_VARIANT}>{data.content}</Typography>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

export default CardContainer;
