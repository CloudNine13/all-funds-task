import styled from '@emotion/styled';
import { FormControl } from '@mui/material';

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20
});

const StyledFormControl = styled(FormControl)({
  width: '400px'
});

const StyledTextareaFormControl = styled(FormControl)({
  width: '400px',
  maxHeight: '400px'
});

export { StyledForm, StyledFormControl, StyledTextareaFormControl };
