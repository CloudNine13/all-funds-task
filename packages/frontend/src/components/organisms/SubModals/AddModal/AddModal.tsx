import { Input, InputLabel, TextareaAutosize, Typography } from '@mui/material';
import { StyledForm, StyledFormControl, StyledTextareaFormControl } from './AddModal.style';
import { useFormik } from 'formik';
import type { SubmodalProps } from '../types';
import { StyledBox, StyledButton } from '../style';

const AddModal = ({ handleClose }: SubmodalProps) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: null
    },
    onSubmit: async (values) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        //const base64 = reader.result?.toString().replace(/^data:.+;base64,/, '');
      };
      reader.readAsDataURL(values.image!);
    }
  });

  const handleSubmitClick = async () => {
    await formik.submitForm();
    formik.resetForm();
    handleClose();
  };

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
        <StyledTextareaFormControl variant="standard">
          <TextareaAutosize
            required
            id="description"
            name="description"
            minRows={6}
            placeholder="Article description..."
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </StyledTextareaFormControl>
        <StyledButton type="submit" onClick={handleSubmitClick}>
          Submit
        </StyledButton>
      </StyledForm>
    </StyledBox>
  );
};

export default AddModal;
