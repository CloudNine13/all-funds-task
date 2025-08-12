import { Input, InputLabel, TextareaAutosize, Typography } from '@mui/material';
import { StyledForm, StyledFormControl, StyledTextareaFormControl } from './AddModal.style';
import { useFormik } from 'formik';
import type { SubmodalProps } from '../types';
import { StyledBox, StyledButton } from '../style';
import { useContext } from 'react';
import { NewsContext } from '@contexts';
import { ADD_MODAL, BUTTONS } from '@constants';
import type { AddDataType } from '@lib/types';

const initialValues: AddDataType = {
  [ADD_MODAL.FIELD.TITLE]: '',
  [ADD_MODAL.FIELD.DESCRIPTION]: '',
  [ADD_MODAL.FIELD.AUTHOR]: '',
  [ADD_MODAL.FIELD.CONTENT]: '',
  [ADD_MODAL.FIELD.IMAGE]: ''
};

const AddModal = ({ handleClose }: SubmodalProps) => {
  const { addNews } = useContext(NewsContext);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await addNews(values);
      formik.resetForm();
      handleClose();
    }
  });

  return (
    <StyledBox>
      <Typography variant="h4">{ADD_MODAL.TITLE}</Typography>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledFormControl variant="standard">
          <InputLabel htmlFor={ADD_MODAL.FIELD.TITLE}>{ADD_MODAL.NAME_LABEL}</InputLabel>
          <Input
            required
            id={ADD_MODAL.FIELD.TITLE}
            name={ADD_MODAL.FIELD.TITLE}
            placeholder={ADD_MODAL.NAME_PLACEHOLDER}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledFormControl>
        <StyledFormControl variant="standard">
          <InputLabel htmlFor={ADD_MODAL.FIELD.AUTHOR}>{ADD_MODAL.AUTHOR_LABEL}</InputLabel>
          <Input
            required
            id={ADD_MODAL.FIELD.AUTHOR}
            name={ADD_MODAL.FIELD.AUTHOR}
            placeholder={ADD_MODAL.AUTHOR_PLACEHOLDER}
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledFormControl>
        <StyledFormControl variant="standard">
          <InputLabel htmlFor={ADD_MODAL.FIELD.DESCRIPTION}>
            {ADD_MODAL.DESCRIPTION_LABEL}
          </InputLabel>
          <Input
            id={ADD_MODAL.FIELD.DESCRIPTION}
            name={ADD_MODAL.FIELD.DESCRIPTION}
            placeholder={ADD_MODAL.DESCRIPTION_PLACEHOLDER}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledFormControl>
        <StyledFormControl variant="standard">
          <input
            accept="image/*"
            required
            type="file"
            id={ADD_MODAL.FIELD.IMAGE}
            name={ADD_MODAL.FIELD.IMAGE}
            onChange={(event) => {
              if (event.target.files && event.target.files.length > 0) {
                formik.setFieldValue(ADD_MODAL.FIELD.IMAGE, event.target.files[0]);
              }
            }}
            onBlur={formik.handleBlur}
          />
        </StyledFormControl>
        <StyledTextareaFormControl variant="standard">
          <TextareaAutosize
            required
            id={ADD_MODAL.FIELD.CONTENT}
            name={ADD_MODAL.FIELD.CONTENT}
            minRows={6}
            placeholder={ADD_MODAL.CONTENT_PLACEHOLDER}
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledTextareaFormControl>
        <StyledButton type="submit">{BUTTONS.SUBMIT}</StyledButton>
      </StyledForm>
    </StyledBox>
  );
};

export default AddModal;
