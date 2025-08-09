import { FormControl, Input, InputLabel, TextareaAutosize, Typography } from '@mui/material';
import { StyledBox, StyledButton } from '../style';
import { useFormik } from 'formik';
import type { SubmodalProps } from '../types';

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
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <FormControl variant="standard" sx={{ width: '400px' }}>
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
        </FormControl>
        <FormControl variant="standard" sx={{ width: '400px', maxHeight: 400 }}>
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
        </FormControl>
        <FormControl variant="standard" sx={{ width: '400px' }}>
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={(event) => {
              if (event.target.files && event.target.files.length > 0) {
                formik.setFieldValue('image', event.target.files[0]);
              }
            }}
            onBlur={formik.handleBlur}
          />
        </FormControl>
        <StyledButton type="submit" onClick={handleSubmitClick}>
          Submit
        </StyledButton>
      </form>
    </StyledBox>
  );
};

export default AddModal;
