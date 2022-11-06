import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Form from './form';

export default async function Page() {
  const token = cookies().get('next-auth.session-token');
  const csrfToken = cookies().get('next-auth.csrf-token');

  if (token?.value) redirect('/');
  if (!csrfToken?.value) redirect('/');
  return <Form csrfToken={csrfToken.value} />;
}
