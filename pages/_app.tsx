// pages/_app.tsx
import { AppProps } from 'next/app';
import Page from '../app/page';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

export default MyApp;
