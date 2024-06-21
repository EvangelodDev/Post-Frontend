import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react';
import { createPost } from '$reducers/postReducers';
import * as Yup from 'yup';

function PostForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Ingrese un nombre'),
    content: Yup.string().required('Ingrese contenido'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      content: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(createPost(values));
      formik.resetForm();
    },
  });

  return (
    <Box as="form" onSubmit={formik.handleSubmit} p={4} borderWidth={1} borderRadius="md">
      <FormControl id="name" mb={4} isInvalid={formik.touched.name && formik.errors.name}>
        <FormLabel>Nombre</FormLabel>
        <Input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        ) : null}
      </FormControl>
      <FormControl id="content" mb={4} isInvalid={formik.touched.content && formik.errors.content}>
        <FormLabel>Contenido</FormLabel>
        <Textarea
          name="content"
          onChange={formik.handleChange}
          value={formik.values.content}
        />
        {formik.touched.content && formik.errors.content ? (
          <FormErrorMessage>{formik.errors.content}</FormErrorMessage>
        ) : null}
      </FormControl>
      <Box w="100%" textAlign="center">
        <Button type="submit" colorScheme="teal" isDisabled={loading}>
          Crear Post
        </Button>
      </Box>
    </Box>
  );
}

export default PostForm;