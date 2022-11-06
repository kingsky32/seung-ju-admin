import '#styles/reset.css';

import React from 'react';
import { Providers } from '#app/providers';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang="ko">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
