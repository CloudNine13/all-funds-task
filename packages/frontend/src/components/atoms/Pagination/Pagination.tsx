import { NewsContext } from '@contexts';
import { Pagination as MUIPagintaion, Stack } from '@mui/material';
import { useContext } from 'react';

const Pagination = () => {
  const { page, pages, handlePageChange } = useContext(NewsContext).pageData;
  return (
    <Stack spacing={2}>
      <MUIPagintaion count={pages} page={page} onChange={handlePageChange} />
    </Stack>
  );
};

export default Pagination;
