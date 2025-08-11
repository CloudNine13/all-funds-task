import { ImageVariant, NewsPageType, type NewsType } from '@lib/types';
import { CardContent, Collapse, Typography } from '@mui/material';

import { useState } from 'react';
import { StyledCard } from './CardContainer.style';
import { CardActions, CardMainInfo, ImageWithFallback } from '@molecules';

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
      <ImageWithFallback type={ImageVariant.NORMAL} height={300} src={data.image} />
      <CardMainInfo data={data} />
      <CardActions
        newsId={data._id}
        pageType={pageType}
        expanded={expanded}
        handleExpandClick={handleExpandClick}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body1">{data.content}</Typography>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

export default CardContainer;
