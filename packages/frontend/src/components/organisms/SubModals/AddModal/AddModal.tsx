import { Input, InputLabel, TextareaAutosize, Typography } from '@mui/material';
import { StyledForm, StyledFormControl, StyledTextareaFormControl } from './AddModal.style';
import { useFormik } from 'formik';
import type { SubmodalProps } from '../types';
import { StyledBox, StyledButton } from '../style';
import { useContext } from 'react';
import { NewsContext } from '@contexts';
import {
  ADD_MODAL_TITLE,
  ADD_MODAL_NAME_LABEL,
  ADD_MODAL_NAME_PLACEHOLDER,
  ADD_MODAL_AUTHOR_LABEL,
  ADD_MODAL_AUTHOR_PLACEHOLDER,
  ADD_MODAL_DESCRIPTION_LABEL,
  ADD_MODAL_DESCRIPTION_PLACEHOLDER,
  ADD_MODAL_CONTENT_PLACEHOLDER,
  ADD_MODAL_SUBMIT_BUTTON,
  ADD_MODAL_FIELD_TITLE,
  ADD_MODAL_FIELD_DESCRIPTION,
  ADD_MODAL_FIELD_AUTHOR,
  ADD_MODAL_FIELD_CONTENT
} from '@constants';

const AddModal = ({ handleClose }: SubmodalProps) => {
  const { addNews } = useContext(NewsContext);

  const formik = useFormik({
    initialValues: {
      [ADD_MODAL_FIELD_TITLE]: '',
      [ADD_MODAL_FIELD_DESCRIPTION]: '',
      [ADD_MODAL_FIELD_AUTHOR]: '',
      [ADD_MODAL_FIELD_CONTENT]: ''
    },
    onSubmit: async (values) => {
      await addNews(values);
      formik.resetForm();
      handleClose();
    }
  });

  return (
    <StyledBox>
      <Typography variant="h4">{ADD_MODAL_TITLE}</Typography>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledFormControl variant="standard">
          <InputLabel htmlFor={ADD_MODAL_FIELD_TITLE}>{ADD_MODAL_NAME_LABEL}</InputLabel>
          <Input
            required
            id={ADD_MODAL_FIELD_TITLE}
            name={ADD_MODAL_FIELD_TITLE}
            placeholder={ADD_MODAL_NAME_PLACEHOLDER}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledFormControl>
        <StyledFormControl variant="standard">
          <InputLabel htmlFor={ADD_MODAL_FIELD_AUTHOR}>{ADD_MODAL_AUTHOR_LABEL}</InputLabel>
          <Input
            required
            id={ADD_MODAL_FIELD_AUTHOR}
            name={ADD_MODAL_FIELD_AUTHOR}
            placeholder={ADD_MODAL_AUTHOR_PLACEHOLDER}
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledFormControl>
        <StyledFormControl variant="standard">
          <InputLabel htmlFor={ADD_MODAL_FIELD_DESCRIPTION}>
            {ADD_MODAL_DESCRIPTION_LABEL}
          </InputLabel>
          <Input
            id={ADD_MODAL_FIELD_DESCRIPTION}
            name={ADD_MODAL_FIELD_DESCRIPTION}
            placeholder={ADD_MODAL_DESCRIPTION_PLACEHOLDER}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledFormControl>
        <StyledTextareaFormControl variant="standard">
          <TextareaAutosize
            required
            id={ADD_MODAL_FIELD_CONTENT}
            name={ADD_MODAL_FIELD_CONTENT}
            minRows={6}
            placeholder={ADD_MODAL_CONTENT_PLACEHOLDER}
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledTextareaFormControl>
        <StyledButton type="submit">{ADD_MODAL_SUBMIT_BUTTON}</StyledButton>
      </StyledForm>
    </StyledBox>
  );
};

export default AddModal;
