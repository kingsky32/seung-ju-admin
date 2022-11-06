'use client';

import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { FieldValues, FormProps } from '#app/(admin)/profile/types';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import schema from './schema';

export default function Form({ defaultValues }: FormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({ defaultValues, resolver: yupResolver(schema) });

  return (
    <Container component="div" maxWidth="xs">
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        onSubmit={handleSubmit((values) => {
          console.log(values);
        })}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={!!errors.image}
              helperText={errors.image?.message as string}
              margin="normal"
              required
              fullWidth
              id="image"
              label="Image"
              autoComplete="image"
              autoFocus
              {...register('image')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={!!errors.firstName}
              helperText={errors.firstName?.message as string}
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoComplete="given-name"
              autoFocus
              {...register('firstName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={!!errors.lastName}
              helperText={errors.lastName?.message as string}
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              autoComplete="family-name"
              autoFocus
              {...register('lastName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!errors.nickname}
              helperText={errors.nickname?.message as string}
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="Nickname"
              autoComplete="nickname"
              autoFocus
              {...register('nickname')}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </LoadingButton>
      </Box>
    </Container>
  );
}
