import React from 'react';
import { headers } from 'next/headers';
import { getSession } from '#libs/session';
import { redirect } from 'next/navigation';
import Form from './form';

export default async function Page() {
  const session = await getSession(headers().get('cookie') as string);
  // eslint-disable-next-line no-undef
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  if (!user) redirect('/sign_in');
  return (
    <Form
      defaultValues={{
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname,
        image: user.image,
      }}
    />
  );
}
