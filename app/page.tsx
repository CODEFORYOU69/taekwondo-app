// app/page.tsx

import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import { CssBaseline } from '@mui/material';
import Layout from './layout'; // Assure-toi que le chemin est correct
import { ReactNode } from 'react';

function Page({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <div>
          {children}
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default Page;