import { Input, InputLabel, TextareaAutosize, Typography } from '@mui/material';
import { StyledForm, StyledFormControl, StyledTextareaFormControl } from './AddModal.style';
import { useFormik } from 'formik';
import type { SubmodalProps } from '../types';
import { StyledBox, StyledButton } from '../style';
import { useContext } from 'react';
import { NewsContext } from '@contexts';

const AddModal = ({ handleClose }: SubmodalProps) => {
  const { addNews } = useContext(NewsContext);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      author: '',
      content: ''
    },
    onSubmit: async (values) => {
      await addNews(values);
      formik.resetForm();
      handleClose();
    }
  });

  return (
    <StyledBox>
      <Typography variant="h4">Add new article</Typography>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledFormControl variant="standard">
          <InputLabel htmlFor="title">Name</InputLabel>
          <Input
            required
            id="title"
            name="title"
            placeholder="Article name..."
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledFormControl>
        <StyledFormControl variant="standard">
          <InputLabel htmlFor="author">Author</InputLabel>
          <Input
            required
            id="author"
            name="author"
            placeholder="Article author..."
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledFormControl>
        <StyledFormControl variant="standard">
          <InputLabel htmlFor="description">description</InputLabel>
          <Input
            id="description"
            name="description"
            placeholder="Article description..."
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledFormControl>
        <StyledTextareaFormControl variant="standard">
          <TextareaAutosize
            required
            id="content"
            name="content"
            minRows={6}
            placeholder="Article content..."
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledTextareaFormControl>
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </StyledBox>
  );
};

export default AddModal;
