import { formatTimestamp } from '@lib/utils';
import { ArchivedText, InfoBox, InfoTypography } from './CardMainInfo.style';
import { CardContent, Typography } from '@mui/material';
import type { NewsType } from '@lib/types';

const CardMainInfo = ({ data }: { data: NewsType }) => {
  return (
    <CardContent>
      <Typography gutterBottom variant="h5">
        {data.title}
      </Typography>
      <InfoBox>
        <InfoTypography>{data.author}</InfoTypography>
        <InfoTypography>{formatTimestamp(data.date)}</InfoTypography>
      </InfoBox>
      <Typography variant="body2">{data.description}</Typography>
      {data.archiveDate && (
        <ArchivedText variant="body1">{`Archived: ${formatTimestamp(data.archiveDate)}`}</ArchivedText>
      )}
    </CardContent>
  );
};

export default CardMainInfo;
