import { EMAIL_REGEX, PASSWORD_REGEX } from '#commons/regex';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
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
import * as yup from 'yup';

const JOIN_MUTATION = gql`
  mutation join(
    $firstName: String!
    $lastName: String!
    $nickname: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    join(
      firstName: $firstName
      lastName: $lastName
      nickname: $nickname
      username: $username
      email: $email
      password: $password
    ) {
      id
    }
  }
`;

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  nickname: yup.string().required('Nickname is required'),
  username: yup.string().required('Username is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(EMAIL_REGEX, 'Please match the e-mail format of the email format'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      PASSWORD_REGEX,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords does not match'),
});

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const [joinMutate, { data, loading, error }] = useMutation(JOIN_MUTATION);
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
                  error?.graphQLErrors?.forEach((graphQLError) => {
                    toast(graphQLError?.message, {
                      type: 'error',
                    });
                  });
                });
            },
          )}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
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
                helperText={errors?.lastName?.message}
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
                helperText={errors?.nickname?.message}
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
                helperText={errors?.username?.message}
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
                helperText={errors?.email?.message}
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
                helperText={errors?.password?.message}
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
                helperText={errors?.confirmPassword?.message}
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
              <Link href="/sign_in" variant="body2">
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
