import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { TypographyProps } from '@mui/material/Typography/Typography';

interface CopyrightProps extends TypographyProps {}

export default function Copyright(props: CopyrightProps): React.ReactElement {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright ©
      <Link color="inherit" href={`${process.env.NEXT_PUBLIC_APP_URL}/`}>
        {process.env.NEXT_PUBLIC_APP_NAME}
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
