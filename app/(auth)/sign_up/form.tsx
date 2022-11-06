'use client';

import React from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import Copyright from '#components/Copyright';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { GraphQLError } from 'graphql';
import schema from './schema';
import { JOIN_MUTATION } from './mutation';

export default function Form(): React.ReactElement {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const [joinMutate, { loading }] = useMutation(JOIN_MUTATION);
  const router = useRouter();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(
            ({ firstName, lastName, nickname, username, email, password }) => {
              joinMutate({
                variables: {
                  firstName,
                  lastName,
                  nickname,
                  username,
                  email,
                  password,
                },
              })
                .then(() => {
                  toast('Success Create User', {
                    type: 'success',
                  });
                  router.push('/sign_in');
                })
                .catch((error) => {
                  error?.graphQLErrors?.forEach(
                    (graphQLError: GraphQLError): void => {
                      toast(graphQLError?.message, {
                        type: 'error',
                      });
                    },
                  );
                });
            },
          )}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.firstName}
                helperText={errors?.firstName?.message as string}
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...register('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.lastName}
                helperText={errors?.lastName?.message as string}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                {...register('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.nickname}
                helperText={errors?.nickname?.message as string}
                required
                fullWidth
                id="nickname"
                label="Nickname"
                autoComplete="nickname"
                {...register('nickname')}
              />
            </Grid>{' '}
            <Grid item xs={12}>
              <TextField
                error={!!errors.username}
                helperText={errors?.username?.message as string}
                required
                fullWidth
                id="username"
                label="Username"
                autoComplete="username"
                {...register('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.email}
                helperText={errors?.email?.message as string}
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.password}
                helperText={errors?.password?.message as string}
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.confirmPassword}
                helperText={errors?.confirmPassword?.message as string}
                required
                fullWidth
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                {...register('confirmPassword')}
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={NextLink} href="/sign_in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
